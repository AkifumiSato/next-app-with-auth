import { getServer } from "server";
import next from "next";

const PORT = 3000;
// eslint-disable-next-line turbo/no-undeclared-env-vars -- next.js requires NODE_ENV
const DEV = process.env.NODE_ENV !== "production";

const app = next({ dev: DEV });
const handle = app.getRequestHandler();

await app.prepare();

const server = getServer();

// redirecting all requests to Next.js
server.all("*", (req, res) => handle(req.raw, res.raw));

server.setNotFoundHandler((req, reply) => app.render404(req.raw, reply.raw));

try {
  await server.listen({ port: PORT });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
