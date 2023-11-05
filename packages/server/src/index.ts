import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import { googleAuthPlugin } from "./google-auth-plugin";
import { healthCheckPlugin } from "./health-check-plugin";

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

  return fastify;
}
