import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import { googleAuthPlugin } from "./google-auth-plugin";
import { healthCheckPlugin } from "./health-check-plugin";

import next from "next";

const PORT = 3000;
const DEV = process.env.NODE_ENV !== "production";

const app = next({ dev: DEV });
const handle = app.getRequestHandler();

await app.prepare();

// todo: validation
const envSettings = {
  sessionSecret: process.env.SESSION_SECRET as string,
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
} as const;

const fastify = Fastify({
  logger: true,
});

fastify.register(healthCheckPlugin);
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  cookieName: "sessionId",
  secret: envSettings.sessionSecret,
});
fastify.register(googleAuthPlugin, {
  serveOrigin: "http://localhost:3000",
  clientId: envSettings.oauth.google.clientId,
  clientSecret: envSettings.oauth.google.clientSecret,
});

const withLoginPath = ["/user"];
fastify.addHook("preHandler", async (request, reply) => {
  if (
    withLoginPath.some((path) => request.url.indexOf(path) === 0) &&
    !request.session.user
  ) {
    // todo: 認証エラーページを作成
    reply.status(401).send("Unauthorized");
  }
});

fastify.all("*", (req, reply) => handle(req.raw, reply.raw));

fastify.setNotFoundHandler((req, reply) => app.render404(req.raw, reply.raw));

try {
  await fastify.listen({ port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

export type { Session } from "./session";
