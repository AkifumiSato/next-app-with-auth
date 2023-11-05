import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import oauthPlugin, { OAuth2Namespace } from "@fastify/oauth2";

// @fastify/oauth2のdeclareが効かないのでpatch
declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace | undefined;
  }
}

// session type declare
declare module "@fastify/session" {
  interface FastifySessionObject {
    user: {
      id: string;
      name: string;
      email: string;
      picture: string;
    };
  }
}

export type ServeOption = {
  serveOrigin: string;
  sessionSecret: string;
  oauth: {
    google: {
      clientId: string;
      clientSecret: string;
    };
  };
};

export function createServer({
  serveOrigin,
  sessionSecret,
  oauth: { google },
}: ServeOption) {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get("/health_check", () => ({
    status: "OK",
  }));

  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    cookieName: "sessionId",
    secret: sessionSecret,
  });
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
    request.session.user = user;
    await request.session.save();
    reply.redirect("/user");
  });

  // todo: 認証パス(/user)チェックを作成後削除
  fastify.get("/debug/session", async function (request, reply) {
    const { user } = request.session;
    reply.send({
      user,
    });
  });

  return fastify;
}
