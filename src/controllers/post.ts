import { FastifyJwtVerifyOptions, VerifyOptions } from "@fastify/jwt";
import { prismaClient } from "../prisma";
import { Post } from "../type-object/post-type";
import { FastifyRequest, FastifyReply } from "fastify";
import { Commentes } from "../type-object/commentes-type";
import fs from "fs";
import { timeStamp } from "console";
export const addPost = async (req: any, res: FastifyReply) => {
  const posts = req.body as Post;
  let authorId = "";
  const token = req.headers.authorization.split(
    " "
  )[1] as Partial<VerifyOptions>;

  req.jwtVerify(token, (_err, decoded) => {
    authorId = decoded.id;
    return decoded;
  });
console.log();

  let files = req.raw.files;
  let file = files.undefined;
  let fileName;
  for (let key in file) {
    fileName = Date.now() + file[key].name;
    fs.writeFile(
      `./uploads/${Date.now()}${file[key].name}`,
      file[key].data,
      () => {}
    );
  }
  const post = await prismaClient.post.create({
    data: { ...posts, authorId, file: fileName },
  });
  res.send(post);
};
