import jwt from "@fastify/jwt";
import fastifyJwt from "@fastify/jwt";
const fastify = require("fastify")();
// const jwt = require("@fastify/jwt");
const fp = require("fastify-plugin");

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
export const authorization = fastify.decorate(
  "authorization",
  async function (request, reply) {
    const auth = request.headers.authorization;
    const token = auth.split(" ")[1];
    await request.jwtVerify(token, (err, decoded) => {
      if (err) reply.send(err);
      if (decoded.role == "admin") return;
      else reply.send("Not authorized");
    });
  }
);
