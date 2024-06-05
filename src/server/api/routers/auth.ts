import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hashPassword, sendEmail } from "~/server/services/auth.service";

// TODO change this
export const authRouter = createTRPCRouter({
  userSignup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string(),
        fullname: z.string(),
        dateOfBirth: z.date(),

        phoneNumber: z.string(),
        instagramHandle: z.string().optional(),
        address: z.string().optional(),
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
          address: input.address?.trim() === "" ? undefined : input.address,
          dateOfBirth: input.dateOfBirth,
          fullname: input.fullname,
          instagramHandle:
            input.instagramHandle?.trim() === ""
              ? undefined
              : input.instagramHandle,
          phoneNumber: input.phoneNumber,
          windPoints: 0,
          earthPoints: 0,
          firePoints: 0,
          waterPoints: 0,
          totalPoints: 0,
          title: "New Recruit",
        },
      });

      return {
        message: "user signup success",
        user,
        code: 201,
      };
    }),
  forgotPasswordSendEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        token: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const emailFound = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
        select: {
          email: true,
        },
      });
      if (emailFound == null) {
        return {
          ok: false,
          message: "User with this email is not found",
        };
      }
      const userPassResetData = await ctx.db.userPasswordReset.findFirst({
        where: {
          email: input.email,
        },
      });
      if (userPassResetData != null) {
        await ctx.db.userPasswordReset.delete({
          where: {
            email: userPassResetData.email,
          },
        });
      }
      // add to userpasswordreset to db
      await ctx.db.userPasswordReset.create({
        data: {
          email: emailFound.email,
          token: `${input.token}`,
        },
      });
      try {
        await sendEmail({
          recipient_email: emailFound.email,
          url: `${process.env.BASE_URL}/auth/forgot-password/reset?token=${input.token}`,
        });
      } catch {
        return {
          ok: false,
          message: "Error Occurred",
        };
      }

      return {
        ok: true,
        message: "Email sent succesfuly",
      };
    }),
  resetPassword: publicProcedure
    .input(
      z.object({
        token: z.string(),
        password: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userResetPasswordData = await ctx.db.userPasswordReset.findFirst({
        where: {
          token: input.token,
        },
      });
      if (userResetPasswordData == null) {
        throw new Error("Link expired");
      }
      const hashedPassword = await hashPassword({
        plaintextPassword: input.password,
      });
      await ctx.db.user.update({
        where: {
          email: userResetPasswordData.email,
        },
        data: {
          password: hashedPassword,
        },
      });

      await ctx.db.userPasswordReset.delete({
        where: {
          email: userResetPasswordData.email,
        },
      });
      return {
        ok: true,
        message: "reset complete",
      };
    }),
});
