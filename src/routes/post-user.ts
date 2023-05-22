import { FastifyInstance } from 'fastify';
import { Users } from '../type-object/user-type';
import { prismaClient } from '../prisma';


export default async (server: FastifyInstance) => {
    server.route({
        method: 'POST',
        url: '/user',
        schema: {
            summary: 'add user',
            tags: ['user'],
            body: Users,
        },
        handler: async (request, reply) => {
            const user = request.body as Users;
            return await prismaClient.user.create({
                data: user,
            });
        }
    })
}
