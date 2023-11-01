import { getServer } from "server";
import next from "next";

const port = 3000;
// eslint-disable-next-line turbo/no-undeclared-env-vars -- next.js requires NODE_ENV
const dev = process.env.NODE_ENV !== "production";

// creating the app either in production or dev mode
const app = next({ dev });
const handle = app.getRequestHandler();

// running the app, async operation
app.prepare().then(() => {
  const server = getServer();

  // redirecting all requests to Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console -- server log
    console.log(`Runing on port ${port}, dev: ${dev}`);
  });
});
