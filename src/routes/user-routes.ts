import { FastifyInstance } from 'fastify';
import { Users } from '../type-object/user-type';
import * as controller from '../controllers'
import { Type } from '@fastify/type-provider-typebox';

export default async (server: FastifyInstance) => {
    server.route({
        method: 'POST',
        url: '/user',
        schema: {
            summary: 'add user',
            tags: ['user'],
            body: Users,
        },
        handler: controller.addUser
    });
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
        handler: controller.getUser
    });
}
