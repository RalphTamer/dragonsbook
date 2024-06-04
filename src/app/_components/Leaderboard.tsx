"use client";

import { useState } from "react";
import LeaderboardCard from "./LeaderboardCard";
import BottomSlideModal from "./UI/BottomSlideModal";
import SVGIcon from "./UI/SVGIcon";
import { humanize } from "~/lib/utils";
import { api } from "~/trpc/react";
import { getBgColor } from "../_services/leaderboard.service";
import Skeleton from "react-loading-skeleton";
import { Users, selectModalItems } from "~/lib/types";
import LeaderboardFilter from "./LeaderboardFilter";
import AsyncButton from "./UI/AsyncButton";

type Props = {
  users: Users;
};
const Leaderboard = (props: Props) => {
  const [leaderboardUsers, setLeaderboardUsers] = useState<Users["allUsers"]>(
    props.users.allUsers,
  );
  const skipNum = 6;
  const [skip, setSkip] = useState<number>(skipNum);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState<
    "FIRE" | "WATER" | "AIR" | "EARTH" | "ALL"
  >("ALL");
  const [filterLoading, setFilterLoading] = useState<boolean>(false);

  return (
    <div className="container mb-4">
      <LeaderboardFilter
        selectedFilterValue={selectedFilterValue}
        onChangeModalValue={async (item) => {
          if (selectedFilterValue === item) return;
          setSkip(skipNum);
          setSelectedFilterValue(item);
          setFilterLoading(true);
          await api.user.getLeaderboardData
            .query({
              filterValue: item,
              skip: 0,
            })
            .then((newLeaderboardUsers) => {
              setLeaderboardUsers(newLeaderboardUsers.allUsers);
            });
          setFilterLoading(false);
        }}
      />
      {filterLoading === true ? (
        <div className="my-12 flex justify-center">
          <SVGIcon name="loader" size={32} className="animate-spin" />
        </div>
      ) : (
        <div>
          {leaderboardUsers.map((user, i) => {
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
                rank={i + 1}
                fontColor={selectedFilterValue === "ALL" ? "#fff" : undefined}
                squareBgColor={getBgColor(selectedFilterValue)}
                key={user.id}
                totalPoints={points}
                username={user.username}
                attendedEvents={user.UserAttendance.length}
                userId={user.id}
                image={user.image}
              />
            );
          })}
        </div>
      )}
      <AsyncButton
        buttonText={
          leaderboardUsers.length === props.users.allUsersCount
            ? "No More"
            : "Load more"
        }
        disabled={
          leaderboardUsers.length === props.users.allUsersCount ||
          isLoading === true
        }
        onClick={async () => {
          await api.user.getLeaderboardData
            .query({
              filterValue: selectedFilterValue,
              skip: skip,
            })
            .then((data) => {
              setLeaderboardUsers((prev) => {
                return [...prev, ...data.allUsers];
              });
              setSkip((prev) => prev + skipNum);
            });
        }}
        style={{
          borderRadius: 12,
          background: getBgColor(selectedFilterValue),
        }}
      />
    </div>
  );
};

export default Leaderboard;
