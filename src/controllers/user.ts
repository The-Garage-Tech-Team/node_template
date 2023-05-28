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
    return await prismaClient.user.create({
        data: {
            ...user,
            password: hashedPassword,
        },
    });
};
export const Login = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.body as Users;

    return await prismaClient.user
        .findUnique({
            where: {
                email: user.email,
            },
        })

        .then(async (User) => {
            if (!User) {
                reply.send("user not found")
            }
            const checkPassword = await bcrypt.compare(user.password, User.password);
            if (checkPassword) {
                return User;
            } else return "Passwords do not match";
        });
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = await prismaClient.user.findMany();
    return user;
};
