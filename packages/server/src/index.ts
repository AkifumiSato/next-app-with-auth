import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import { googleAuthPlugin } from "./google-auth-plugin";
import { healthCheckPlugin } from "./health-check-plugin";

export type ServeOption = {
  serveOrigin: string;
  sessionSecret: string;
  withLoginPath: string[];
  oauth: {
    google: {
      clientId: string;
      clientSecret: string;
    };
  };
};

export function createAuthServer({
  serveOrigin,
  sessionSecret,
  oauth: { google },
  withLoginPath,
}: ServeOption) {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(healthCheckPlugin);
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    cookieName: "sessionId",
    secret: sessionSecret,
  });
  fastify.register(googleAuthPlugin, {
    serveOrigin,
    clientId: google.clientId,
    clientSecret: google.clientSecret,
  });

  fastify.addHook("preHandler", async (request, reply) => {
    if (
      withLoginPath.some((path) => request.url.indexOf(path) === 0) &&
      !request.session.user
    ) {
      // todo: 認証エラーページを作成
      reply.status(401).send("Unauthorized");
    }
  });

  return fastify;
}
