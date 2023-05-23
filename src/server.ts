import fastify from 'fastify'
import fastifyAutoload from '@fastify/autoload';
import fastifySensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { join } from 'path';

export const server = fastify({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      ownProperties: true,
    },
  }
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySwagger, {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'node template',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    // security: [
    // 	{
    // 		bearerAuth: [],
    // 	},
    // ],
    // components:{
    //   securitySchemes:{
    //     bearerAuth: {
    // 			type: 'http',
    // 			scheme: 'bearer',
    // 			bearerFormat: 'JWT',
    // 		},
    //   }
    // }
  }
});
const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

server.register(fastifySensible);
server.register(fastifySwaggerUi, swaggerUiOptions);
server.register(fastifyAutoload, {
  dir: join(__dirname, 'routes'),
});

const port: any = process.env.PORT ?? process.env.$PORT ?? 3002;

export function listen() {
  server
    .listen({
      port: port,
      host: '0.0.0.0',
    })
    .catch((err) => {
      server.log.error(err);
      process.exit(1);
    });
}