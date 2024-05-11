import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getLeaderboardData: protectedProcedure
    .input(
      z.object({
        filterValue: z
          .literal("AIR")
          .or(z.literal("EARTH"))
          .or(z.literal("FIRE"))
          .or(z.literal("WATER"))
          .or(z.literal("ALL")),
      }),
    )
    .query(async ({ input, ctx }) => {
      const filterValue = input.filterValue;
      const take = 3;
      // TODO try to do the rank in a single call
      let orderBy = {};
      if (filterValue === "AIR") {
        orderBy = {
          airPoints: "desc",
        };
      } else if (filterValue === "EARTH") {
        orderBy = {
          earthPoints: "desc",
        };
      } else if (filterValue === "FIRE") {
        orderBy = {
          firePoints: "desc",
        };
      } else if (filterValue === "WATER") {
        orderBy = {
          waterPoints: "desc",
        };
      } else {
        orderBy = {};
      }
      const allUsers = await ctx.db.user.findMany({
        select: {
          password: false,
          airPoints: true,
          earthPoints: true,
          email: true,
          firePoints: true,
          id: true,
          image: true,
          role: true,
          title: true,
          username: true,
          waterPoints: true,
          UserAttendance: true,
        },
        orderBy,
        take,
      });

      return allUsers;
    }),
  getUserRank: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // TODO : do the rank procedure
      const allUsers = await ctx.db.user.findMany({});

      return allUsers;
    }),
});
