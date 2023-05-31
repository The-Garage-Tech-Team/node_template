import { FastifyReply, FastifyRequest } from "fastify";
import { prismaClient } from "../prisma";
import { Users } from "../type-object/user-type";
import * as bcrypt from "bcrypt";
import { userInfo } from "os";

const SALT = process.env.SALT;
export const Register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.body as Users;
  const hashedPassword = await bcrypt.hash(user.password, Number(SALT));
  const users = await prismaClient.user.findUnique({
    where: {
      email: user.email.toLowerCase(),
    },
  });
  if (users) {
    reply.send("user already exists");
  } else {
    await prismaClient.user.create({
      data: {
        ...user,
        password: hashedPassword,
        email: user.email.toLowerCase(),
      },
    });

    reply.send("Registered");
  }
};
export const Login = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.body as Users;
  const User = await prismaClient.user.findUnique({
    where: {
      email: user.email.toLowerCase(),
    },
  });

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
  const token = await reply.jwtSign(
    {
      id: User.id,
    },
    { expiresIn: "2h" }
  );
  const result = {
    name: User.name,
    id: User.id,
    token,
  };
  reply.send(result);
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = await prismaClient.user.findMany();
  return user;
};
export const editProfile = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.body as Users;
  const { id } = request.params as Users;
  const User = await prismaClient.user.findUnique({
    where: { id: id },
  });

  return await prismaClient.user.update({
    where: { id: User.id },
    data: {
      ...user,
    },
  });
};
export const editPassword = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.body as Users;
  const { id } = request.params as Users;
  const User = await prismaClient.user.findUnique({
    where: { id: id },
  });

  const checkPassword = await bcrypt.compare(user.oldPassword, User.password);
  const hashedPassword = await bcrypt.hash(user.password, Number(SALT));
  return await prismaClient.user.update({
    where: { id: User.id },
    data: {
      password: checkPassword ? hashedPassword : null,
    },
  });
};
