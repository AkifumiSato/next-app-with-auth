import { createServer } from "server";
import next from "next";

const PORT = 3000;
// eslint-disable-next-line turbo/no-undeclared-env-vars -- next.js requires NODE_ENV
const DEV = process.env.NODE_ENV !== "production";

const app = next({ dev: DEV });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer({
  serveOrigin: "http://localhost:3000",
  sessionSecret: process.env.SESSION_SECRET,
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});

// redirecting all requests to Next.js
server.all("*", (req, reply) => handle(req.raw, reply.raw));

server.setNotFoundHandler((req, reply) => app.render404(req.raw, reply.raw));

try {
  await server.listen({ port: PORT });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
