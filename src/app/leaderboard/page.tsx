import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";
import Leaderboard from "../_components/Leaderboard";

const LeaderboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user == null) {
    redirect("/auth/login");
  }

  return <Leaderboard />;
};

export default LeaderboardPage;
