const fp = require("fastify-plugin");

const fastify = require("fastify")();

export const authentication = fastify.decorate(
  "authenticate",
  async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
);
