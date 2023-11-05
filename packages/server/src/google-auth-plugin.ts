import oauthPlugin, { OAuth2Namespace } from "@fastify/oauth2";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

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

const googleAuthPluginCallback: FastifyPluginAsync<{
  serveOrigin: string;
  clientId: string;
  clientSecret: string;
}> = async (fastify, opts) => {
  fastify.register(oauthPlugin, {
    name: "googleOAuth2",
    scope: ["profile", "email"],
    credentials: {
      client: {
        id: opts.clientId,
        secret: opts.clientSecret,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/login/google",
    callbackUri: `${opts.serveOrigin}/login/google/callback`,
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
    request.session.user = await userResponse.json();
    await request.session.save();
    reply.redirect("/user");
  });
};

export const googleAuthPlugin = fp(googleAuthPluginCallback);
