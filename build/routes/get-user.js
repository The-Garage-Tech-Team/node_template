"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_type_1 = require("../type-object/user-type");
const prisma_1 = require("../prisma");
const typebox_1 = require("@sinclair/typebox");
exports.default = (server) => __awaiter(void 0, void 0, void 0, function* () {
    server.route({
        method: 'GET',
        url: '/users',
        schema: {
            summary: 'get user',
            tags: ['user'],
            response: {
                '2xx': typebox_1.Type.Array(user_type_1.Users),
            },
        },
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield prisma_1.prismaClient.user.findMany();
            return user;
        })
    });
});
