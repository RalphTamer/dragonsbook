"use client";

import type { SpecialBadge as SB } from "@prisma/client";
import SpecialBadge from "../SpecialBadge";
import { useState } from "react";
import AsyncButton from "../UI/AsyncButton";
import { api } from "~/trpc/react";
import { style } from "~/lib/styles";
import Link from "next/link";
import SVGIcon from "../UI/SVGIcon";

type Props = {
  specialBadgesData: {
    specialBadges: SB[];
    specialBadgesCount: number;
  };
};
const ViewSpecialBadgesPage = (props: Props) => {
  const skipVal = 6;
  const [specialBadges, setSpecialBadges] = useState<SB[]>(
    props.specialBadgesData.specialBadges,
  );
  const [skip, setSkip] = useState<number>(skipVal);
  return (
    <div className="container">
      <div className="my-4 space-y-2">
        {specialBadges.map((badge) => {
          return (
            <div key={badge.id} className="relative">
              <SpecialBadge badge={badge} />
              <div
                onClick={async () => {
                  if (
                    window.confirm(
                      "Deleting Special badge will remove it from all the users profile",
                    ) === true
                  ) {
                    const del = await api.admin.deleteSpecialBadge.query({
                      badgeId: badge.id,
                    });
                    if (del.success === true) {
                      alert(del.message);
                    }
                    if (typeof window != null) {
                      window.location.href = "/admin/special-badge";
                    }
                  }
                }}
                className="absolute"
                style={{
                  right: 0,
                  top: "50%",
                  transform: "translate(0,-50%)",
                }}
              >
                <SVGIcon name="x" size={26} color="#000" />
              </div>
            </div>
          );
        })}
      </div>
      <AsyncButton
        buttonText={
          specialBadges.length === props.specialBadgesData.specialBadgesCount
            ? "No More"
            : "Load more"
        }
        disabled={
          specialBadges.length === props.specialBadgesData.specialBadgesCount
        }
        onClick={async () => {
          const badges = await api.admin.getSpecialBadges.query({
            skip: skip,
          });
          setSpecialBadges((prev) => {
            return [...prev, ...badges.specialBadges];
          });
          setSkip((prev) => prev + skipVal);
        }}
        style={{
          borderRadius: 12,
          background: style.color.fireRed,
        }}
      />
    </div>
  );
};

export default ViewSpecialBadgesPage;
