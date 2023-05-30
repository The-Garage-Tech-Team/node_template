import { Static, Type } from '@sinclair/typebox';
export const Users = Type.Object({
    name: Type.String(),
    email: Type.String(),
    password: Type.String(),
    mobile: Type.Integer(),

    
});
export type Users = Static<typeof Users>;
