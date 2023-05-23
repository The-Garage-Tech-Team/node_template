/// <reference types="node" />
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
export declare const server: import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, TypeBoxTypeProvider>;
export declare function listen(): void;
