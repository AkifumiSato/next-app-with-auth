import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const healthCheckPluginCallback: FastifyPluginAsync<never> = async (
  fastify,
  _opts,
) => {
  fastify.get("/health_check", () => ({
    status: "OK",
  }));
};

export const healthCheckPlugin = fp(healthCheckPluginCallback);
