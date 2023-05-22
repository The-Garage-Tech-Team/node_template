import {Static, Type} from '@sinclair/typebox';
export const Users = Type.Object({
    name: Type.String(),
});
export type Users = Static<typeof Users>;
