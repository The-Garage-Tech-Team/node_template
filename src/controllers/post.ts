import { VerifyOptions } from "@fastify/jwt";
import { prismaClient } from "../prisma";
import { Post } from "../type-object/post-type";
import { FastifyReply } from "fastify";
import fs from "fs";

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

  let fileName;
  if (file.name) {
    fileName = Date.now() + file.name;
    fs.writeFile(`./uploads/${Date.now()}${file.name}`, file.data, () => {});
  } else {
    for (let key in file) {
      fileName = Date.now() + file[key].name;
      fs.writeFile(
        `./uploads/${Date.now()}${file[key].name}`,
        file[key].data,
        () => {}
      );
    }
  }

  const post = await prismaClient.post.create({
    data: { ...posts, authorId, file: fileName },
  });
  res.send(post);
};
