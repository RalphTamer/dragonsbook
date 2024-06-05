import { z } from "zod";
import QRCode from "qrcode";
import { AdminProtectedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const adminRouter = createTRPCRouter({
  getAllUsers: AdminProtectedProcedure.input(
    z.object({
      skip: z.number(),
      q: z.string().nullable(),
    }),
  ).query(async ({ input, ctx }) => {
    try {
      let where = {};
      if (input.q != null && input.q != "") {
        where = {
          //   email: {
          //     contains: input.q,
          //   },
          //   fullname: {
          //     contains: input.q,
          //   },
          username: {
            contains: input.q,
          },
        };
      }
      const allUsers = await ctx.db.user.findMany({
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
        },
        skip: input.skip,
        take: 6,
        where,
      });
      const usersCount = await ctx.db.user.count({
        where,
      });
      return { allUsers, usersCount };
    } catch (e) {
      throw new Error(" error");
    }
  }),
  changeUserPoints: AdminProtectedProcedure.input(
    z.object({
      userId: z.string(),
      windPoints: z.number(),
      firePoints: z.number(),
      waterPoints: z.number(),
      earthPoints: z.number(),
    }),
  ).query(async ({ input, ctx }) => {
    try {
      const totalPoints =
        input.windPoints +
        input.earthPoints +
        input.firePoints +
        input.waterPoints;
      const updatedUserPoints = await ctx.db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          windPoints: input.windPoints,
          waterPoints: input.waterPoints,
          firePoints: input.firePoints,
          earthPoints: input.earthPoints,
          totalPoints,
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
        },
      });
      return {
        success: true,
        message: "User Points Update Success",
        updatedData: updatedUserPoints,
      };
    } catch (e) {
      return {
        success: false,
        message: "User Points Update failed",
        updatedData: null,
      };
    }
  }),
  deleteUser: AdminProtectedProcedure.input(
    z.object({
      userId: z.string(),
    }),
  ).query(async ({ input, ctx }) => {
    try {
      await ctx.db.userAttendance.deleteMany({
        where: {
          userId: input.userId,
        },
      });
      await ctx.db.userAcquiredSpecialBadge.deleteMany({
        where: {
          userId: input.userId,
        },
      });
      await ctx.db.user.delete({
        where: {
          id: input.userId,
        },
      });
    } catch (e) {
      throw new Error("error deleting user");
    }
  }),
  AddPopup: AdminProtectedProcedure.input(
    z.object({
      title: z.string(),
      day: z.number(),
      month: z.string(),
      link: z.string(),
      content: z.string(),
    }),
  ).query(async ({ input, ctx }) => {
    const previousPopup = await ctx.db.popup.findFirst();
    try {
      if (previousPopup != null) {
        await ctx.db.popup.delete({
          where: {
            id: previousPopup.id,
          },
        });
        await ctx.db.popup.create({
          data: {
            content: input.content,
            day: input.day,
            month: input.month,
            title: input.title,
            link: input.link,
          },
        });
      }
      return {
        success: true,
        message: "Popup creation success",
      };
    } catch (e) {
      return {
        success: false,
        message: "Popup creation failed , please try again",
      };
    }
  }),
  AddSpecialBadge: AdminProtectedProcedure.input(
    z.object({
      title: z.string(),
      year: z.number(),
      image: z.string().url(),
      content: z.string(),
    }),
  ).query(async ({ input, ctx }) => {
    try {
      await ctx.db.specialBadge.create({
        data: {
          content: input.content,
          image: input.image,
          title: input.title,
          year: input.year,
        },
      });
      return {
        success: true,
        message: "special badge added successfully",
      };
    } catch (e) {
      throw new Error("special badge creation failed , try again later");
    }
  }),
  generateEvent: AdminProtectedProcedure.input(
    z.object({
      qr: z.string().url().nullable(),
      name: z.string(),
      type: z.string(),
      pointsAdded: z.number(),
    }),
  ).query(async ({ input, ctx }) => {
    try {
      const event = await ctx.db.event.create({
        data: {
          name: input.name,
          qr: input.qr,
          type: input.type,
          pointsAdded: input.pointsAdded,
        },
      });
      const qrCodeImageBuffer = await QRCode.toBuffer(
        `${process.env.BASE_URL}/redeem/${event.id}`,
        {
          type: "png",
          errorCorrectionLevel: "H",
        },
      );
      const blob = new Blob([qrCodeImageBuffer]);

      const file = new File(
        [blob],
        `file-qr-${Math.ceil(Math.random() * 1234235) * Math.ceil(Math.random() * 1234235)}.png`,
        {
          type: "image/png",
        },
      );
      const response = await utapi.uploadFiles(file);
      if (response.data != null) {
        await ctx.db.event.update({
          data: {
            qr: response.data.url,
          },
          where: {
            id: event.id,
          },
        });
      }
      return {
        success: true,
        message: "Event Creation Success",
      };
    } catch (e) {
      return {
        success: false,
        message: "Unknown Error, Creation failed",
      };
    }
  }),
  deleteEvent: AdminProtectedProcedure.input(
    z.object({
      id: z.string(),
    }),
  ).query(async ({ input, ctx }) => {
    try {
      await ctx.db.userAttendance.deleteMany({
        where: {
          eventId: input.id,
        },
      });
      const { qr } = await ctx.db.event.delete({
        where: {
          id: input.id,
        },
        select: {
          qr: true,
        },
      });
      if (qr != null) {
        const key = qr.split("/").reverse()[0]!;
        await utapi.deleteFiles([key]);
        return {
          success: true,
          message: "Event deleted successfully",
        };
      }
    } catch (e) {
      return {
        success: false,
        message: "Unknown error , please try again",
      };
    }
  }),
  getAllEvents: AdminProtectedProcedure.input(
    z.object({
      skip: z.number(),
    }),
  ).query(async ({ input, ctx }) => {
    const allEvents = await ctx.db.event.findMany({
      take: 6,
      skip: input.skip,
      orderBy: {
        createdAt: "desc",
      },
    });
    const allEventsCount = await ctx.db.event.count();

    return {
      allEvents,
      allEventsCount,
    };
  }),
  getEventById: AdminProtectedProcedure.input(
    z.object({
      id: z.string(),
    }),
  ).query(async ({ input, ctx }) => {
    const event = await ctx.db.event.findFirstOrThrow({
      where: {
        id: input.id,
      },
    });
    return event;
  }),
  getSpecialBadges: AdminProtectedProcedure.input(
    z.object({
      skip: z.number(),
    }),
  ).query(async ({ input, ctx }) => {
    const take = 6;
    const specialBadges = await ctx.db.specialBadge.findMany({
      take,
      skip: input.skip,
      orderBy: {
        createdAt: "desc",
      },
    });
    const specialBadgesTotalCount = await ctx.db.specialBadge.count();
    return {
      specialBadges,
      specialBadgesCount: specialBadgesTotalCount,
    };
  }),
  deleteSpecialBadge: AdminProtectedProcedure.input(
    z.object({ badgeId: z.string() }),
  ).query(async ({ ctx, input }) => {
    const specialBadgeAcquired = await ctx.db.userAcquiredSpecialBadge.findMany(
      {
        where: {
          badgeId: input.badgeId,
        },
      },
    );
    if (specialBadgeAcquired.length > 0) {
      await Promise.all(
        specialBadgeAcquired.map(async (acq) => {
          await ctx.db.userAcquiredSpecialBadge.delete({
            where: {
              id: acq.id,
            },
          });
        }),
      );
    }
    const spbadge = await ctx.db.specialBadge.findFirst({
      where: {
        id: input.badgeId,
      },
    });

    if (spbadge != null) {
      await ctx.db.specialBadge.delete({
        where: {
          id: input.badgeId,
        },
      });
      const key = spbadge.image.split("/").reverse()[0]!;
      await utapi.deleteFiles([key]);
      return {
        success: true,
        message: "Special Badge delete success",
      };
    }

    return {
      success: false,
      message: "Special Badge delete failed",
    };
  }),
  getSpecialBadgesByUserId: AdminProtectedProcedure.input(
    z.object({
      skip: z.number(),
      userId: z.string(),
    }),
  ).query(async ({ input, ctx }) => {
    const take = 6;
    const specialBadges = await ctx.db.userAcquiredSpecialBadge.findMany({
      where: {
        userId: input.userId,
      },
      take,
      skip: input.skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        specialBadge: true,
      },
    });

    const specialBadgesTotalCount = await ctx.db.userAcquiredSpecialBadge.count(
      {
        where: {
          userId: input.userId,
        },
      },
    );
    return {
      specialBadges,
      specialBadgesCount: specialBadgesTotalCount,
    };
  }),
  removeUserBadge: AdminProtectedProcedure.input(
    z.object({
      badgeId: z.string(),
    }),
  ).query(async ({ input, ctx }) => {
    const userBadgeFound = await ctx.db.userAcquiredSpecialBadge.findFirst({
      where: {
        badgeId: input.badgeId,
      },
    });

    if (userBadgeFound != null) {
      await ctx.db.userAcquiredSpecialBadge.deleteMany({
        where: {
          id: userBadgeFound.id,
        },
      });
      return {
        success: true,
        message: "Badge removed from user",
      };
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }),
  giveUserBadge: AdminProtectedProcedure.input(
    z.object({
      userId: z.string(),
      badgeId: z.string(),
    }),
  ).query(async ({ input, ctx }) => {
    try {
      const alreadyHaveBadge = await ctx.db.userAcquiredSpecialBadge.findFirst({
        where: {
          badgeId: input.badgeId,
          userId: input.userId,
        },
      });
      if (alreadyHaveBadge != null) {
        return {
          success: false,
          message: "User already have this badge",
        };
      }
      const badgeData = await ctx.db.userAcquiredSpecialBadge.create({
        data: {
          badgeId: input.badgeId,
          userId: input.userId,
        },
        include: {
          specialBadge: true,
        },
      });
      return {
        badgeData,
        success: true,
        message: "Badge Given to user Successfully",
      };
    } catch (e) {
      return {
        success: false,
        message: "Badge Given to user failed",
      };
    }
  }),
});
