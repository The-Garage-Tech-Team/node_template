import { Static, Type } from "@sinclair/typebox";
export const Users = Type.Object({

  oldPassword:Type.Optional(Type.String()),
  id:Type.Optional(Type.String()),
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
  mobile: Type.Integer(),

});
export type Users = Static<typeof Users>;

