import { UTApi } from "uploadthing/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getDataBasedOnEventType } from "~/server/services/user.service";

const utapi = new UTApi();
export const userRouter = createTRPCRouter({
  getLeaderboardData: protectedProcedure
    .input(
      z.object({
        filterValue: z
          .literal("WIND")
          .or(z.literal("EARTH"))
          .or(z.literal("FIRE"))
          .or(z.literal("WATER"))
          .or(z.literal("ALL")),
        skip: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const filterValue = input.filterValue;
      const take = 6;
      let orderBy = {};
      if (filterValue === "WIND") {
        orderBy = {
          windPoints: "desc",
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
        orderBy = {
          totalPoints: "desc",
        };
      }
      const allUsers = await ctx.db.user.findMany({
        select: {
          password: false,
          windPoints: true,
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
        skip: input.skip,
      });

      // await new Promise((resolve) => setTimeout(resolve, 5000));
      const usersCount = await ctx.db.user.count();
      return {
        allUsers,
        allUsersCount: usersCount,
      };
    }),
  getUserRank: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const allUsersByTotal = ctx.db.user.findMany({
        select: {
          id: true,
        },
        orderBy: {
          totalPoints: "desc",
        },
      });
      const allUsersByFire = await ctx.db.user.findMany({
        select: {
          id: true,
        },
        orderBy: {
          firePoints: "desc",
        },
      });
      const allUsersByEarth = await ctx.db.user.findMany({
        select: {
          id: true,
        },
        orderBy: {
          earthPoints: "desc",
        },
      });
      const allUsersBywind = await ctx.db.user.findMany({
        select: {
          id: true,
        },
        orderBy: {
          windPoints: "desc",
        },
      });
      const allUsersByWater = await ctx.db.user.findMany({
        select: {
          id: true,
        },
        orderBy: {
          waterPoints: "desc",
        },
      });

      const [
        usersByTotalPoints,
        usersByFirePoints,
        usersByEarthPoints,
        usersBywindPoints,
        usersByWaterPoints,
      ] = await Promise.all([
        allUsersByTotal,
        allUsersByFire,
        allUsersByEarth,
        allUsersBywind,
        allUsersByWater,
      ]);

      const totalRank =
        usersByTotalPoints.findIndex((i) => i.id === input.userId) + 1;
      const fireRank =
        usersByFirePoints.findIndex((i) => i.id === input.userId) + 1;
      const earthRank =
        usersByEarthPoints.findIndex((i) => i.id === input.userId) + 1;
      const windRank =
        usersBywindPoints.findIndex((i) => i.id === input.userId) + 1;
      const waterRank =
        usersByWaterPoints.findIndex((i) => i.id === input.userId) + 1;

      return {
        rankByTotalPoints: totalRank,
        rankByFirePoints: fireRank,
        rankByEarthPoints: earthRank,
        rankBywindPoints: windRank,
        rankByWaterPoints: waterRank,
      };
    }),
  getUserById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userData = await ctx.db.user.findFirstOrThrow({
        where: {
          id: input.id,
        },
        select: {
          address: true,
          windPoints: true,
          dateOfBirth: true,
          earthPoints: true,
          email: true,
          firePoints: true,
          fullname: true,
          id: true,
          image: true,
          instagramHandle: true,
          password: false,
          phoneNumber: true,
          role: true,
          title: true,
          totalPoints: true,
          username: true,
          waterPoints: true,
          createdAt: true,
          UserAcquiredSpecialBadge: {
            include: {
              specialBadge: true,
            },
          },
        },
      });

      return userData;
    }),
  changeProfilePicture: protectedProcedure
    .input(
      z.object({
        image: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const previousImage = await ctx.db.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          image: true,
        },
      });
      if (previousImage?.image != null) {
        const key = previousImage.image.split("/").reverse()[0]!;
        await utapi.deleteFiles([key]);
      }
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          image: input.image,
        },
      });
      return {
        success: true,
      };
    }),
  updateUserData: protectedProcedure
    .input(
      z.object({
        fullname: z.string(),
        dateOfBirth: z.date(),
        email: z.string(),
        phoneNumber: z.string(),
        instagramHandle: z.string(),
        address: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        const upadtedUserData = await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            fullname: input.fullname,
            dateOfBirth: input.dateOfBirth,
            email: input.email,
            phoneNumber: input.phoneNumber,
            instagramHandle: input.instagramHandle,
            address: input.address,
          },
          select: {
            address: true,
            windPoints: true,
            dateOfBirth: true,
            earthPoints: true,
            email: true,
            firePoints: true,
            fullname: true,
            id: true,
            image: true,
            instagramHandle: true,
            password: false,
            phoneNumber: true,
            role: true,
            title: true,
            totalPoints: true,
            username: true,
            waterPoints: true,
            createdAt: true,
            verified: false,
          },
        });
        return {
          success: true,
          message: "user data update success",
          userData: upadtedUserData,
        };
      } catch (e) {
        return {
          success: false,
          message: "something went wrong , please try again",
          userData: null,
        };
      }
    }),
  getPopupData: publicProcedure.query(async ({ ctx }) => {
    const popupData = await ctx.db.popup.findFirst();

    return popupData;
  }),
  redeemPoints: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
      });
      if (event == null) {
        return {
          success: false,
          userId: ctx.session.user.id,
          message: "Sorry, This event no longer exists",
        };
      }
      if (event.active === false) {
        return {
          success: false,
          userId: ctx.session.user.id,
          message: "Sorry, this event is no longer active",
        };
      }

      const didUserAttend = await ctx.db.userAttendance.findFirst({
        where: {
          userId: ctx.session.user.id,
          eventId: event.id,
        },
      });
      if (didUserAttend != null) {
        return {
          success: false,
          userId: ctx.session.user.id,
          message: "Points already been redeemed",
        };
      }
      await ctx.db.userAttendance.create({
        data: {
          userId: ctx.session.user.id,
          eventId: event.id,
        },
      });
      const eventType = event.type;
      const data = getDataBasedOnEventType({
        eventType,
        points: event.pointsAdded,
      });

      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data,
      });

      return {
        success: true,
        type: eventType,
        userId: ctx.session.user.id,
        message: `${eventType} SCORE + ${event.pointsAdded}`,
      };
    }),
});
