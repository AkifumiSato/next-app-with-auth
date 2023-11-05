import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import oauthPlugin, { OAuth2Namespace } from "@fastify/oauth2";

// @fastify/oauth2のdeclareが効かないのでpatch
declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace | undefined;
  }
}

export type ServeOption = {
  serveOrigin: string;
  oauth: {
    google: {
      clientId: string;
      clientSecret: string;
    };
  };
};

export function createServer({ serveOrigin, oauth: { google } }: ServeOption) {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get("/health_check", () => ({
    status: "OK",
  }));

  fastify.register(fastifyCookie);

  fastify.register(oauthPlugin, {
    name: "googleOAuth2",
    scope: ["profile", "email"],
    credentials: {
      client: {
        id: google.clientId,
        secret: google.clientSecret,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/login/google",
    callbackUri: `${serveOrigin}/login/google/callback`,
  });

  fastify.get("/login/google/callback", async function (request, reply) {
    const result = await this.googleOAuth2
      ?.getAccessTokenFromAuthorizationCodeFlow(request)
      .catch((err: unknown) => {
        reply.send(err);
      });

    if (!result?.token) {
      reply.send("token is undefined");
      return;
    }

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + result.token.access_token,
        },
      },
    );
    const user = await userResponse.json();
    // todo: Sessionに格納する
    fastify.log.info({ user });
    reply.redirect("/user");
  });

  return fastify;
}
