import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { prismaClient } from "../prisma";
import { Users } from "../type-object/user-type";

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.body as Users;
    return await prismaClient.user.create({
        data: user,
    });
}

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = await prismaClient.user.findMany();
    return user;
}