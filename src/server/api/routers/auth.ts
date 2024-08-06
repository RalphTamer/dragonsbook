import { randomUUID } from "crypto";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  comparePasswordToHash,
  hashPassword,
  sendEmail,
  sendVerificationEmail,
} from "~/server/services/auth.service";

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
    .query(async ({ input, ctx }) => {
      let instagramHandle = input.instagramHandle;
      if (instagramHandle?.trim() === "") {
        instagramHandle = undefined;
      }
      if (instagramHandle != null) {
        if (instagramHandle.startsWith("@")) {
          instagramHandle = instagramHandle.substring(1);
        } else {
          return {
            success: false,
            message: "Instagram handle must starts with @",
          };
        }
      }
      if (input.username.length > 12) {
        return {
          success: false,
          message: "Username must be less than 12 characters",
        };
      }
      if (input.username.length < 3) {
        return {
          success: false,
          message: "Username must be more than 3 characters",
        };
      }
      const emailExists = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (emailExists != null) {
        return {
          success: false,
          message: "Email already registered",
        };
      }
      const usernameExists = await ctx.db.user.findFirst({
        where: {
          username: input.username,
        },
      });
      if (usernameExists != null) {
        return {
          success: false,
          message: "Username is taken",
        };
      }
      const hashedPassword = await hashPassword({
        plaintextPassword: input.password,
      });
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          role: input.email === "thisiscamp49@gmail.com" ? "ADMIN" : "USER",
          password: hashedPassword,
          username: input.username,
          address: input.address?.trim() === "" ? undefined : input.address,
          dateOfBirth: input.dateOfBirth,
          fullname: input.fullname,
          instagramHandle:
            instagramHandle?.trim() === "" ? undefined : instagramHandle,
          phoneNumber: input.phoneNumber,
          windPoints: 0,
          earthPoints: 0,
          firePoints: 0,
          waterPoints: 0,
          totalPoints: 0,
          title: "New Recruit",
        },
      });
      const token = await ctx.db.activateToken.create({
        data: {
          userId: user.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        },
      });

      await sendVerificationEmail({
        recipient_email: user.email,
        url: `${process.env.BASE_URL}/auth/activate/${token.token}`,
      });

      return {
        success: true,
        message: "User signup success",
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
  changePassword: protectedProcedure
    .input(
      z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
        confirmPassword: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (input.newPassword !== input.confirmPassword) {
        return {
          success: false,
          message: "Your new Password does not match the confirmation password",
        };
      }
      const userPassword = await ctx.db.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          password: true,
        },
      });
      if (userPassword == null) {
        return {
          success: false,
          message: "User does not exist",
        };
      }
      const CompareUserOldPasswordtpInput = await comparePasswordToHash({
        hash: userPassword.password,
        plaintextPassword: input.oldPassword,
      });
      if (CompareUserOldPasswordtpInput.isEqual === false) {
        return {
          success: false,
          message: "your old password was entered incorrectly",
        };
      }
      const newPasswordHashed = await hashPassword({
        plaintextPassword: input.newPassword,
      });
      await ctx.db.user.update({
        data: {
          password: newPasswordHashed,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
      return {
        success: true,
        message: "Your password has been updated!",
      };
    }),
  verifyUser: publicProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const token = input.token;
      const user = await ctx.db.user.findFirst({
        where: {
          activateTokens: {
            some: {
              AND: [
                {
                  activatedAt: null,
                },
                {
                  createdAt: {
                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                  },
                },
                {
                  token,
                },
              ],
            },
          },
        },
      });

      if (!user) {
        throw new Error("Token is invalid or expired");
      }

      await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          verified: true,
        },
      });

      await ctx.db.activateToken.update({
        where: {
          token,
        },
        data: {
          activatedAt: new Date(),
        },
      });

      return {
        success: true,
      };
    }),
  sendVerificationEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (user == null) {
        return {
          success: false,
          message: "User not found",
        };
      }
      const emailAlreadySent = await ctx.db.user.findFirst({
        where: {
          activateTokens: {
            some: {
              AND: [
                {
                  activatedAt: null,
                },
                {
                  createdAt: {
                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                  },
                },
              ],
            },
          },
        },
      });
      if (emailAlreadySent != null) {
        return {
          success: false,
          message: "Email is already sent , please check spam emails",
        };
      }
      const token = await ctx.db.activateToken.create({
        data: {
          userId: user.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        },
      });

      await sendVerificationEmail({
        recipient_email: user.email,
        url: `${process.env.BASE_URL}/auth/activate/${token.token}`,
      });

      return {
        success: true,
        message: "Email sent",
      };
    }),
});
