import { FastifyReply, FastifyRequest } from "fastify";
import { prismaClient } from "../prisma";
import { Users } from "../type-object/user-type";
import * as bcrypt from "bcrypt";

export const Register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.body as Users;
  const SALT = process.env.SALT;

  const hashedPassword = await bcrypt.hash(user.password, Number(SALT));
  return await prismaClient.user
    .findUnique({
      where: {
        email: user.email.toLowerCase(),
      },
    })
    .then((users) => {
      if (users) {
        reply.send("user already exists");
      } else {
        return prismaClient.user
          .create({
            data: {
              ...user,
              password: hashedPassword,
              email: user.email.toLowerCase(),
            },
          })
          .then(() => {
            reply.send("Registered");
          });
      }
    });
}
export const Login = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.body as Users;
  return await prismaClient.user
    .findUnique({
      where: {
        email: user.email,
      },
    })
    .then(async (User) => {
      const token = await reply.jwtSign(
        {
          id: User.user_id,
        },
        { expiresIn: "2h" }
      );
      const result = {
        name: User.name,
        id: User.user_id,
        token,
      };
      if (!User) {
        reply.send("user not found");
      }
      const checkPassword = await bcrypt.compare(user.password, User.password);
      if (!checkPassword) {
        reply.send("password incorrect");
      }
      if (!User.isActive) {
        reply.send("user is not active");
      }
      reply.send(result);
    });
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = await prismaClient.user.findMany();
  return user;
};
