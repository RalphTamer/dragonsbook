"use client";
import type { SpecialBadge, User } from "@prisma/client";
import { useState } from "react";
import { style } from "~/lib/styles";
import { api } from "~/trpc/react";
import AsyncButton from "../UI/AsyncButton";
import EditPointsPage from "./EditPointsPage";
import EditUserSpecialBadges from "./EditUserSpecialBadges";
import Image from "next/image";

type Props = {
  userData: Omit<User, "password">;
  allBadges: {
    specialBadges: SpecialBadge[];
    specialBadgesCount: number;
  };
  specialBadgesData: {
    specialBadges: ({
      specialBadge: {
        id: string;
        title: string;
        content: string;
        image: string;
        year: number;
        createdAt: Date;
      };
    } & {
      id: string;
      userId: string;
      badgeId: string;
      createdAt: Date;
    })[];
    specialBadgesCount: number;
  };
};

const UserInfo = (props: Props) => {
  const { userData } = props;
  const [activePage, setActivePage] = useState<"points" | "badges">("points");

  return (
    <div className="container my-4 space-y-2">
      <div className="flex flex-col items-center justify-center space-y-2">
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
            maxWidth: 200,
            borderRadius: 18,
          }}
        />
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          {userData.username}
        </div>
      </div>
      <div>
        <div>Fullname : {userData.fullname}</div>
        <div>Email : {userData.email}</div>
      </div>
      <AsyncButton
        onClick={async () => {
          if (
            window.confirm(
              `WARNING you are about to delete user ${userData.username}`,
            )
          ) {
            await api.admin.deleteUser.query({
              userId: props.userData.id,
            });

            if (typeof window != null) {
              window.location.href = "/admin";
            }
          }
        }}
        buttonText="DELETE USER"
        style={{
          borderRadius: 18,
          backgroundColor: style.color.fireRed,
          color: "white",
          fontWeight: "bold",
        }}
      />
      <div className="flex justify-between">
        <div
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: activePage === "points" ? "#000" : "#ccc",
          }}
          onClick={() => {
            setActivePage("points");
          }}
        >
          EDIT POINTS
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: activePage === "badges" ? "#000" : "#ccc",
          }}
          onClick={() => {
            setActivePage("badges");
          }}
        >
          SPECIAL BADGES
        </div>
      </div>
      {activePage === "points" ? (
        <EditPointsPage userData={props.userData} />
      ) : (
        <EditUserSpecialBadges
          allBadges={props.allBadges}
          userId={props.userData.id}
          specialBadgesData={props.specialBadgesData}
        />
      )}
    </div>
  );
};

export default UserInfo;
