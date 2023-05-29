import { FastifyInstance } from "fastify";
import { Users } from "../type-object/user-type";
import * as controller from "../controllers";
import { Type } from "@fastify/type-provider-typebox";

export default async (server: FastifyInstance) => {
  server.route({
    method: "POST",
    url: "/userRegister",
    schema: {
      summary: "user signup",
      tags: ["user"],
      body: Users,
    },
    handler: controller.Register,
  });
  server.route({
    method: "POST",
    url: "/userLogin",
    schema: {
      summary: "user login",
      tags: ["user"],
      body: Type.Object({
        email: Type.String(),
        password: Type.String(),
      }),
    },
    handler: controller.Login,
  });
  server.route({
    method: "GET",
    url: "/users",
    schema: {
      summary: "get user",
      tags: ["user"],
      response: {
        "2xx": Type.Array(Users),
      },
    },
    handler: controller.getUser,
  });

  server.route({
    method: "GET",
    url: "/api/activate/user/:hash",
    schema: {
      summary: "user Activate",
      tags: ["user"],
     
    },
    handler: controller.findUser,
  });

  server.route({
    method: "POST",
    url: "/ForgetPassword",
    schema: {
      summary: "ForgetPassword",
      tags: ["user"],
      body: Type.Object({
        email: Type.String(),

      }),
    },
    handler: controller.sendMail,
  });


  server.route({
    method: "POST",
    url: "/verifyOTP/:email",
    schema: {
      summary: "verifyOTP",
      tags: ["user"],
      body: Type.Object({
        otp: Type.String(),

      }),
    },
    handler: controller.verifyOTP,
  });


  server.route({
    method: "PUT",
    url: "/resetPassword/:id",
    schema: {
      summary: "resetPassword",
      tags: ["user"],
      body: Type.Object({
        password: Type.String(),

      }),
    },
    handler: controller.resetPassword,
  });
};


