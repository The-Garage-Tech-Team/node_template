import { Static, Type } from "@sinclair/typebox";

export const Post = Type.Object({
  description: Type.String(),
  file: Type.Array(Type.String()),
});
export type Post = Static<typeof Post>;
