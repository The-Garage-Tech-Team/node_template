import { VerifyOptions } from "@fastify/jwt";
import { FastifyRequest, FastifyReply, } from "fastify";

const fastify = require("fastify")();

export const authentication = fastify.decorate(
  "authenticate",
  async function (request:FastifyRequest, reply:FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
);

export const authorization = fastify.decorate(
  "authorization",
  async function (request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers.authorization.split(" ")[1] as Partial<VerifyOptions>;

    await request.jwtVerify(token, (err, decoded) => {
      if (err) reply.send(err);
      if (decoded.role == "admin") return;
      else reply.send("Not authorized");
    });
  }
);
