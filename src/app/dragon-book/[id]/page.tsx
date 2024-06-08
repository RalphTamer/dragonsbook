import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import DragonBook from "../../_components/DragonBook";
import localFont from "next/font/local";
const edgeOfTheGalaxy = localFont({
  src: "../../_fonts/EdgeOfTheGalaxyPoster-3zRAp.otf",
});

const Profile = async (props: {
  params: {
    id: string;
  };
}) => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/auth/login");
  }
  const userData = await api.user
    .getUserById({
      id: props.params.id,
    })
    .catch(() => {
      redirect(`/dragon-book/${session.user.id}`);
    });
  const userRank = await api.user.getUserRank({
    userId: props.params.id,
  });

  return (
    <DragonBook
      edgeOfTheGalaxy={edgeOfTheGalaxy}
      session={session}
      userData={userData}
      userRank={userRank}
    />
  );
};

export default Profile;
