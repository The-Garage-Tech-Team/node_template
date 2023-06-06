import { FastifyInstance } from "fastify";
import { addPost,add_commentes } from "../controllers/post";
import { authentication } from '../hooks/auth';
import { Commentes } from "../type-object/commentes-type";
import { Post } from "../type-object/post-type";
export default async (server: FastifyInstance) => {
  server.route({
    method: "POST",
    url: "/addPost",
    schema: {
      summary: "Post",
      tags: ["post"],
      body: Post,
    },
    onRequest: authentication.authenticate,
    handler: addPost,
  });


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
