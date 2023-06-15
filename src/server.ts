import fastify from "fastify";
import fastifyAutoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import jwt from "@fastify/jwt";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import path, { join } from "path";
import fastifyStatic from "@fastify/static";
import fileUpload from "fastify-file-upload";
export const server = fastify({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: "all",
      ownProperties: true,
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySwagger, {
  mode: "dynamic",
  openapi: {
    info: {
      title: "node template",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

const swaggerUiOptions = {
  routePrefix: "/",
  exposeRoute: true,
};
const SeCKey = process.env.SeCKey;

server.register(jwt, {
  secret: SeCKey,
});
server.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});

server.register(fileUpload);
// server.register(fastifyPost)

server.register(fastifySensible);
server.register(fastifySwaggerUi, swaggerUiOptions);
server.register(fastifyAutoload, {
  dir: join(__dirname, "routes"),
});

const port: any = process.env.PORT ?? process.env.$PORT ?? 8080;

export function listen() {
  server
    .listen({
      port: port,
    })
    .catch((err) => {
      server.log.error(err);
      process.exit(1);
    });
}
