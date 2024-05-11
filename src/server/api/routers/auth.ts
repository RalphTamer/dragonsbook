import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { hashPassword } from "~/server/services/auth.service";

export const authRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const emailExists = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (emailExists != null) {
        throw new Error("Email already exist");
      }
      const usernameExists = await ctx.db.user.findFirst({
        where: {
          username: input.username,
        },
      });
      if (usernameExists != null) {
        throw new Error("username already exist");
      }
      const hashedPassword = await hashPassword({
        plaintextPassword: input.password,
      });
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          role: "USER",
          password: hashedPassword,
          username: input.username,
          airPoints: 0,
          earthPoints: 0,
          firePoints: 0,
          waterPoints: 0,
          title: "New Recruit",
        },
      });

      return {
        message: "user register success",
        user,
        code: 201,
      };
    }),

  session: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.session;
  }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
