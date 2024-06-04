"use client";
import { style } from "~/lib/styles";
import BadgesCard from "./BadgesCard";
import { useState } from "react";
import { NextFont } from "next/dist/compiled/@next/font";
import { UserRank } from "~/lib/types";
import { User } from "@prisma/client";
import SpecialBadge from "./SpecialBadge";
import type { DragonBookUser } from "./DragonBook";

type Props = {
  userData: DragonBookUser;
  userRank: UserRank;
  edgeOfTheGalaxy: NextFont;
};
const BadgesTypeSelector = (props: Props) => {
  const { userData, userRank } = props;
  const [selectedBadgesType, setSelectedBadgesType] = useState<
    "regular" | "special"
  >("regular");

  return (
    <>
      <div
        className="flex justify-between"
        style={{
          borderBottom:
            selectedBadgesType === "special" ? "1px solid #afafaf" : "unset",
        }}
      >
        <div
          onClick={() => {
            setSelectedBadgesType("regular");
          }}
          className={`my-4 ${props.edgeOfTheGalaxy.className}`}
          style={{
            fontSize: 24,
            fontWeight: "normal",
            letterSpacing: 1,
            color: selectedBadgesType === "regular" ? "#000" : "#afafaf",
          }}
        >
          BADGES
        </div>
        <div
          onClick={() => {
            setSelectedBadgesType("special");
          }}
          className={`my-4 ${props.edgeOfTheGalaxy.className}`}
          style={{
            fontSize: 24,
            fontWeight: "normal",
            letterSpacing: 1,
            color: selectedBadgesType === "special" ? "#000" : "#afafaf",
          }}
        >
          SPECIAL BADGES
        </div>
      </div>
      {selectedBadgesType === "regular" ? (
        <>
          <BadgesCard
            subtitle={"Camping / Wildlife Training..."}
            badgeName="FIRE BADGE"
            points={userData.firePoints}
            rank={userRank.rankByFirePoints}
            color={style.color.fireRed}
            image="/icons/fire-badge.png"
          />
          <BadgesCard
            subtitle={"Yoga / Kayak / Skiing..."}
            badgeName="WATER BADGE"
            points={userData.waterPoints}
            rank={userRank.rankByWaterPoints}
            color={style.color.waterBlue}
            image="/icons/water-badge.png"
          />
          <BadgesCard
            subtitle={"Climbing / Cycling / Slack Line..."}
            badgeName="AIR BADGE"
            points={userData.airPoints}
            rank={userRank.rankByAirPoints}
            color={style.color.airYellow}
            image="/icons/air-badge.png"
          />
          <BadgesCard
            subtitle={"Hiking / Trail Running..."}
            badgeName="EARTH BADGE"
            points={userData.earthPoints}
            rank={userRank.rankByEarthPoints}
            color={style.color.earthGreen}
            image="/icons/earth-badge.png"
          />
        </>
      ) : (
        <div>
          {userData.UserAcquiredSpecialBadge.length > 0 ? (
            userData.UserAcquiredSpecialBadge.map((badge) => {
              return <SpecialBadge badge={badge.specialBadge} key={badge.id} />;
            })
          ) : (
            <div className="mt-8 text-center font-bold" style={{
              color:style.color.fireRed
            }}>No special badges acquired</div>
          )}
        </div>
      )}
    </>
  );
};

export default BadgesTypeSelector;
