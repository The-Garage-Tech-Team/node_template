import { Static, Type } from "@sinclair/typebox";

export const Commentes = Type.Object({
    commentes: Type.String(),
  });
  export type Commentes = Static<typeof Commentes>;