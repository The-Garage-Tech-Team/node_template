import { FastifyInstance } from "fastify";
import { addPost } from "../controllers/post";
import { authentication } from '../hooks/auth';
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
};
