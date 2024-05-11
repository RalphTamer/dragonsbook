"use client";

import { useState } from "react";
import LeaderboardCard from "./LeaderboardCard";
import Modal from "./UI/BottomSlideModal";
import SVGIcon from "./UI/SVGIcon";
import { style } from "~/lib/styles";
import { humanize } from "~/lib/utils";
import { api } from "~/trpc/react";
import { getBgColor } from "../_services/leaderboard.service";
export type Users = {
  waterPoints: number;
  airPoints: number;
  earthPoints: number;
  firePoints: number;
  id: string;
  username: string;
  UserAttendance: {
    id: string;
    userId: string;
    eventId: string;
  }[];
  title: string;
  image: string | null;
  email: string;
  role: string;
}[];

export const selectModalItems = [
  "ALL",
  "AIR",
  "FIRE",
  "WATER",
  "EARTH",
] as const;

const Leaderboard = () => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState<
    "FIRE" | "WATER" | "AIR" | "EARTH" | "ALL"
  >("ALL");

  //   const [leaderboardUsers, setLeaderboardUsers] = useState<Users>(users);

  const { data: leaderboardUsers, isLoading } =
    api.user.getLeaderboardData.useQuery({
      filterValue: selectedFilterValue,
    });

  return (
    <div className="container">
      <div
        className="mb-4 flex justify-between py-4"
        style={{ fontSize: 13, borderBottom: "1px solid #ccc" }}
      >
        <div className="flex items-center space-x-1">
          <SVGIcon name="filter" size={16} />
          <div className="flex items-center space-x-1">
            <div
              className="flex items-center space-x-1"
              onClick={() => {
                setModalIsVisible(true);
              }}
            >
              <div>filter by : </div>
              <div>{humanize(selectedFilterValue)}</div>
            </div>
            <Modal
              isOpen={modalIsVisible}
              onClose={() => {
                setModalIsVisible(false);
              }}
            >
              <div className="container space-y-2">
                <div className="text-center text-[16px] font-bold uppercase">
                  Filter By
                </div>
                {selectModalItems.map((item) => {
                  return (
                    <div
                      key={item}
                      style={{
                        background: getBgColor(item),
                        borderRadius: "12px",
                      }}
                      className="  py-2 text-center text-[18px] text-white"
                      onClick={async () => {
                        setSelectedFilterValue(item);
                        setModalIsVisible(false);
                      }}
                    >
                      {humanize(item)}
                    </div>
                  );
                })}
              </div>
            </Modal>
          </div>
        </div>
        <div>sortby : top Points</div>
      </div>
      {isLoading === true || leaderboardUsers == null ? (
        <div>loading</div>
      ) : (
        <div>
          {leaderboardUsers.map((user) => {
            let points;

            if (selectedFilterValue === "AIR") {
              points = user.airPoints;
            } else if (selectedFilterValue === "EARTH") {
              points = user.earthPoints;
            } else if (selectedFilterValue === "FIRE") {
              points = user.firePoints;
            } else if (selectedFilterValue === "WATER") {
              points = user.waterPoints;
            } else {
              points =
                user.waterPoints +
                user.airPoints +
                user.earthPoints +
                user.firePoints;
            }

            return (
              <LeaderboardCard
                squareBgColor={getBgColor(selectedFilterValue)}
                key={user.id}
                totalPoints={points}
                username={user.username}
                attendedEvents={user.UserAttendance.length}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
