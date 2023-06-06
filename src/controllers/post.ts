import { FastifyJwtVerifyOptions, VerifyOptions } from "@fastify/jwt";
import { prismaClient } from "../prisma";
import { Post } from "../type-object/post-type";
import { FastifyRequest, FastifyReply } from "fastify";
import { Commentes } from "../type-object/commentes-type";
export const addPost = async (req: FastifyRequest, res: FastifyReply) => {
  const posts = req.body as Post;
  let authorId = "";
  const token = req.headers.authorization.split(" ")[1] as Partial<VerifyOptions>;

   req.jwtVerify(token, (_err, decoded) => {
    authorId = decoded.id;
    return decoded;  
  });

  const post = await prismaClient.post.create({
    data: { ...posts,  authorId },
  });
  res.send(post);
};




export const add_commentes=async (req,res)=>{
  const token = req.headers.authorization.split(" ")[1] as Partial<VerifyOptions>;
  let userId = "";

   req.jwtVerify(token, (_err, decoded) => {
    userId = decoded.id;
    return decoded;
  });
  const commentes = req.body as Commentes;
  const findPOST = await prismaClient.post.findUnique({
    where:{
      id:req.params.id
    }
  })
 if(findPOST){
  const addComment = await prismaClient.commentes.create({
    data:{
      commentes:commentes.commentes,
      postId:req.params.id,
      userId:userId
    }
  })
  
res.send(addComment)
 }else{
  res.send('post not found')
 }
}
