import { FastifyInstance } from "fastify";
import {
  addPost,
  //  createPost
} from "../controllers/post";
import { authentication } from "../hooks/auth";
export default async (server: FastifyInstance) => {
  server.route({
    method: "POST",
    url: "/addPost",
    schema: {
      summary: "Post",
      tags: ["post"],
      body: {
        properties: {
          description: { type: "string" },
          authorId: { type: "string" },
          title: { type: "string" },
        },
      },
    },
    onRequest: authentication.authenticate,
    handler: addPost,
  });
  // server.route({
  //   method: "POST",
  //   url: "/createPost",
  //   schema: {
  //     summary: "Post",
  //     tags: ["post"],
  //     body: {
  //       properties: {
  //         // file: { type: "object"},
  //         description: { type: "string" },
  //         authorId: { type: "string" },
  //         title: { type: "string" },
  //       },
  //     },
  //   },
  //   onRequest: authentication.authenticate,
  //   handler: createPost,
  // });
};
