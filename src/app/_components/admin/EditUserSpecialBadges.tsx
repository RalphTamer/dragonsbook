"use client";
import { useState } from "react";
import BottomSlideModal from "../UI/BottomSlideModal";
import SpecialBadge from "../SpecialBadge";
import SVGIcon from "../UI/SVGIcon";
import { api } from "~/trpc/react";
import AsyncButton from "../UI/AsyncButton";
import { style } from "~/lib/styles";
import type { SpecialBadge as SB } from "@prisma/client";

type Props = {
  userId: string;
  allBadges: {
    specialBadges: SB[];
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
const EditUserSpecialBadges = (props: Props) => {
  const skipnum = 6;
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [skipOwned, setSkipOwned] = useState<number>(skipnum);
  const [skipAll, setSkipAll] = useState<number>(skipnum);
  const [ownedBadges, setOwnedBadges] = useState<
    Props["specialBadgesData"]["specialBadges"]
  >(props.specialBadgesData.specialBadges);
  const [ownedBadgesCount, setOwnedBadgesCount] = useState<number>(
    props.specialBadgesData.specialBadgesCount,
  );
  const [allBadges, setAllBadges] = useState<
    Props["allBadges"]["specialBadges"]
  >(props.allBadges.specialBadges);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div
        className="px-1 py-2 text-center"
        style={{
          background: style.color.fireRed,
          borderRadius: 18,
          color: "white",
          fontWeight: 500,
        }}
        onClick={() => {
          setModalIsVisible(true);
        }}
      >
        Give Badge
      </div>
      {ownedBadges.length > 0 ? (
        <div>
          <div>
            <div
              className="text-center"
              style={{
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              User owned badges
            </div>
            {ownedBadges.map((badge) => {
              return (
                <div className="relative flex" key={badge.id}>
                  <SpecialBadge badge={badge.specialBadge} />
                  <div
                    onClick={async () => {
                      if (
                        typeof window != null &&
                        window.confirm(
                          "Are you sure you want to take back the badge?",
                        ) === true
                      ) {
                        await api.admin.removeUserBadge.query({
                          badgeId: badge.specialBadge.id,
                        });

                        window.location.href = `/admin/user/${props.userId}`;
                      }
                    }}
                    className="absolute"
                    style={{
                      top: "50%",
                      right: 0,
                      transform: "translate(0%,-50%)",
                    }}
                  >
                    <SVGIcon name="x" />
                  </div>
                </div>
              );
            })}
            {ownedBadges.length > skipOwned - 2 && (
              <AsyncButton
                buttonText={
                  ownedBadges.length === ownedBadgesCount
                    ? "No More"
                    : "Load more"
                }
                disabled={ownedBadges.length === ownedBadgesCount}
                onClick={async () => {
                  const res = await api.admin.getSpecialBadgesByUserId.query({
                    skip: skipOwned,
                    userId: props.userId,
                  });
                  setOwnedBadges((prev) => {
                    return [...prev, ...res.specialBadges];
                  });
                  setSkipOwned((prev) => prev + skipnum);
                }}
                style={{
                  borderRadius: 12,
                  background: style.color.fireRed,
                  marginTop: 8,
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className="text-center"
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: style.color.fireRed,
          }}
        >
          No Badges Found
        </div>
      )}
      <BottomSlideModal
        height="90vh"
        isOpen={modalIsVisible}
        onClose={() => {
          setModalIsVisible(false);
        }}
      >
        <div className="container">
          <div>
            <div className="flex justify-center">
              {isLoading === true && (
                <SVGIcon name="loader" size={30} className="animate-spin" />
              )}
            </div>
            {allBadges.map((badge) => {
              return (
                <div className="relative flex" key={badge.id}>
                  <SpecialBadge badge={badge} />
                  <div
                    onClick={async () => {
                      if (
                        typeof window != null &&
                        window.confirm(
                          "Are you sure you want to give user this badge?",
                        ) === true
                      ) {
                        setIsLoading(true);
                        const badgeRes = await api.admin.giveUserBadge.query({
                          badgeId: badge.id,
                          userId: props.userId,
                        });

                        if (badgeRes.badgeData != null) {
                          setOwnedBadgesCount((prev) => prev + 1);
                          setOwnedBadges((prev) => {
                            return [badgeRes.badgeData, ...prev];
                          });
                        }
                        setIsLoading(false);
                        setModalIsVisible(false);
                        alert(badgeRes.message);
                      }
                    }}
                    className="absolute"
                    style={{
                      top: "50%",
                      right: 0,
                      transform: "translate(0%,-50%)",
                    }}
                  >
                    <SVGIcon name="check" strokeWidth={2} size={30} />
                  </div>
                </div>
              );
            })}
          </div>

          <AsyncButton
            buttonText={
              allBadges.length === props.allBadges.specialBadgesCount
                ? "No More"
                : "Load more"
            }
            disabled={allBadges.length === props.allBadges.specialBadgesCount}
            onClick={async () => {
              const res = await api.admin.getSpecialBadges.query({
                skip: skipAll,
              });
              setAllBadges((prev) => {
                return [...prev, ...res.specialBadges];
              });
              setSkipAll((prev) => prev + skipnum);
            }}
            style={{
              borderRadius: 12,
              background: style.color.fireRed,
              marginTop: 8,
            }}
          />
        </div>
      </BottomSlideModal>
    </>
  );
};

export default EditUserSpecialBadges;
