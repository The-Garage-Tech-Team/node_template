import { FastifyInstance } from 'fastify';
import { Users } from '../type-object/user-type';
import * as controller from '../controllers'
import { Type } from '@fastify/type-provider-typebox';

export default async (server: FastifyInstance) => {
    server.route({
        method: 'POST',
        url: '/userRegister',
        schema: {
            summary: 'user signup',
            tags: ['user'],
            body: Users,
        },
        handler: controller.Register
    });
    server.route({
        method: 'POST',
        url: '/userLogin',
        schema: {
            summary: 'user login',
            tags: ['user'],
            body: Type.Object({
                email: Type.String(),
                password: Type.String(),
            }),
        },
        handler: controller.Login
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
