"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.Users = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
});
