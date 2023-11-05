import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

//一覧取得
fastify.get("/health_check", (req, res) => {
  res.send(
    JSON.stringify({
      status: "OK",
    }),
  );
});

export function getServer() {
  return fastify;
}
