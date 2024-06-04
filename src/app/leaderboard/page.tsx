import { api } from "~/trpc/server";

import { redirect } from "next/navigation";
import Leaderboard from "../_components/Leaderboard";
import { getServerAuthSession } from "~/server/auth";

const LeaderboardPage = async () => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/auth/login");
  }
  const users = await api.user.getLeaderboardData({
    filterValue: "ALL",
    skip: 0,
  });

  return <Leaderboard users={users} />;
};

export default LeaderboardPage;
