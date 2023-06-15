import { VerifyOptions } from "@fastify/jwt";
import { prismaClient } from "../prisma";
import { Post } from "../type-object/post-type";
import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import busboy from "busboy";
import stream from "stream";
import util from "util";

export const addPost = async (req, res) => {
  const posts = req.body as Post;
  let authorId = "";
  const token = req.headers.authorization.split(
    " "
  )[1] as Partial<VerifyOptions>;

  req.jwtVerify(token, (_err, decoded) => {
    authorId = decoded.id;
    return decoded;
  });

  let files = req.raw.files;
  let file = files.undefined;

  let fileName = [];
  if (file.name) {
    fileName.push(Date.now() + file.name);
    fs.writeFile(`./uploads/${Date.now()}${file.name}`, file.data, () => {});
  } else {
    for (let key in file) {
      fileName.push(Date.now() + file[key].name);
      fs.writeFile(
        `./uploads/${Date.now()}${file[key].name}`,
        file[key].data,
        () => {}
      );
    }
  }

  const post = await prismaClient.post.create({
    data: {
      title: "",
      description: "",
      authorId,
      file: fileName,
    },
  });
  res.send(post);
};
// export const createPost = async (request, reply) => {
//   const posts = request.body as Post;
//   let authorId = "";
//   const token = request.headers.authorization.split(
//     " "
//   )[1] as Partial<VerifyOptions>;

//   request.jwtVerify(token, (_err, decoded) => {
//     authorId = decoded.id;
//     return decoded;
//   });
//   const files = request.body;
//   const pipeline = util.promisify(stream.pipeline);

//   let file;
//   // for await (const part of files) {
//   //   file = Date.now() + part.filename;
//   //   pipeline(
//   //     part.file,
//   //     fs.createWriteStream(`./uploads/${Date.now() + part.filename}`)
//   //   );
//   // }
//   const post = await prismaClient.post.create({
//     data: {
//       title: "",
//       description: "",
//       authorId,
//       file: [file],
//     },
//   });

//   reply.send(post);
// };
