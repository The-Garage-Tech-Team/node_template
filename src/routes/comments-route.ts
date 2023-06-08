import { FastifyInstance } from "fastify";
import {add_commentes } from "../controllers/commentes";
import { authentication } from '../hooks/auth';
import { Commentes } from "../type-object/commentes-type";
export default async (server: FastifyInstance) => {

  server.route({
    method: "POST",
    url: "/addcomment/:id",
    schema: {
      summary: "Commentes",
      tags: ["commentes"],
      body: Commentes,
    },
    onRequest: authentication.authenticate,
    handler: add_commentes,
  });
};
