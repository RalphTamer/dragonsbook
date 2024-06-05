import type { Session } from "next-auth";

export type Users = {
  allUsers: {
    title: string;
    image: string | null;
    username: string;
    UserAttendance: {
      id: string;
      userId: string;
      eventId: string;
    }[];
    email: string;
    id: string;
    role: string;
    earthPoints: number;
    windPoints: number;
    waterPoints: number;
    firePoints: number;
  }[];
  allUsersCount: number;
};

export const selectModalItems = [
  "ALL",
  "WIND",
  "FIRE",
  "WATER",
  "EARTH",
] as const;

export type UserRank = {
  rankByTotalPoints: number;
  rankByFirePoints: number;
  rankByEarthPoints: number;
  rankBywindPoints: number;
  rankByWaterPoints: number;
};

export type NewSession =
  | (Session & {
      user:
        | (Session["user"] & {
            role: "ADMIN" | "USER";
          })
        | null;
    })
  | null;
