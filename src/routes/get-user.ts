import { FastifyInstance } from 'fastify';
import { Users } from '../type-object/user-type';
import { prismaClient } from '../prisma';
import { Type } from '@sinclair/typebox';

export default async (server: FastifyInstance) => {
    server.route({
        method: 'GET',
        url: '/users',
        schema: {
            summary: 'get user',
            tags: ['user'],
            response: {
                '2xx': Type.Array(Users),
            },
        },
        handler: async (request, reply) => {
            const user = await prismaClient.user.findMany();
            return user;
        }
    })
}