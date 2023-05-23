"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const sensible_1 = __importDefault(require("@fastify/sensible"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const path_1 = require("path");
exports.server = (0, fastify_1.default)({
    logger: true,
    ajv: {
        customOptions: {
            removeAdditional: 'all',
            ownProperties: true,
        },
    }
}).withTypeProvider();
exports.server.register(swagger_1.default, {
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
exports.server.register(sensible_1.default);
exports.server.register(swagger_ui_1.default, swaggerUiOptions);
exports.server.register(autoload_1.default, {
    dir: (0, path_1.join)(__dirname, 'routes'),
});
const port = (_b = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : process.env.$PORT) !== null && _b !== void 0 ? _b : 3002;
function listen() {
    exports.server
        .listen({
        port: port,
        host: '0.0.0.0',
    })
        .catch((err) => {
        exports.server.log.error(err);
        process.exit(1);
    });
}
exports.listen = listen;
