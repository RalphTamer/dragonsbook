"use client";
import { style } from "~/lib/styles";
import SVGIcon from "./UI/SVGIcon";
import type { User } from "@prisma/client";
import type { Session } from "next-auth";
import type { NextFont } from "next/dist/compiled/@next/font";
import type { UserRank } from "~/lib/types";
import BadgesTypeSelector from "./BadgesTypeSelector";
import { useState } from "react";
import EditProfile from "./EditProfile";
import { formatNumber } from "~/lib/utils";
import Image from "next/image";

export type DragonBookUser = Omit<User, "password"> & {
  UserAcquiredSpecialBadge: ({
    specialBadge: {
      id: string;
      title: string;
      content: string;
      image: string;
      year: number;
    };
  } & {
    id: string;
    userId: string;
    badgeId: string;
  })[];
};
type Props = {
  userData: DragonBookUser;
  userRank: UserRank;
  session: Session;
  edgeOfTheGalaxy: NextFont;
};
const DragonBook = (props: Props) => {
  const { userRank } = props;
  const [userData, setUserData] = useState<Omit<User, "password">>(
    props.userData,
  );
  const [activePage, setactivePage] = useState<"view" | "edit">("view");
  return (
    <div>
      {activePage === "view" ? (
        <div className="container mt-4">
          <div
            className="relative flex w-full gap-4 pb-4"
            style={{
              borderBottom: "1px solid #ccc",
            }}
          >
            {props.session.user.id === props.userData.id ? (
              <div
                onClick={() => {
                  setactivePage("edit");
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <SVGIcon name="pencil" size={22} />
              </div>
            ) : (
              props.userData.instagramHandle != null && (
                <a
                  href={`https://www.instagram.com/${props.userData.instagramHandle}`}
                  target="_blank"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  <SVGIcon name="instagram" size={22} />
                </a>
              )
            )}
            <div className="w-[35%]">
              <Image
                src={userData.image ?? "/images/character.jpg"}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  //
                  borderRadius: 12,
                }}
              />
            </div>
            <div className="flex w-[65%] flex-col justify-between">
              <div style={{ lineHeight: 1 }}>
                <div className="text-[18px] font-bold">{userData.fullname}</div>
                <div
                  style={{
                    color: style.color.fireRed,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  rank:#{userRank.rankByTotalPoints}
                </div>
              </div>
              <div
                className="flex gap-4"
                style={{
                  fontSize: 12,
                }}
              >
                <div>
                  <div>Title:</div>
                  <div>Total Pts:</div>
                  <div>Username:</div>
                </div>
                <div>
                  <div>{userData.title}</div>
                  <div>{formatNumber(userData.totalPoints) ?? 0}</div>
                  <div>{userData.username}</div>
                </div>
              </div>
            </div>
          </div>
          <BadgesTypeSelector
            edgeOfTheGalaxy={props.edgeOfTheGalaxy}
            userData={props.userData}
            userRank={props.userRank}
          />
        </div>
      ) : (
        <EditProfile
          userData={userData}
          userRank={userRank}
          updateUserData={(user) => {
            setUserData(user);
            setactivePage("view");
          }}
          onCancelButtonClick={() => {
            setactivePage("view");
          }}
        />
      )}
    </div>
  );
};

export default DragonBook;
