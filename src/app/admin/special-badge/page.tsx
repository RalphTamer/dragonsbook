import { redirect } from "next/navigation";
import ViewSpecialBadgesPage from "~/app/_components/admin/ViewSpecialBadgesPage";
import { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const ViewSpecialBadges = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/dragon-book/${session.user.id}`);
  }
  const specialBadges = await api.admin.getSpecialBadges({
    skip: 0,
  });
  return <ViewSpecialBadgesPage specialBadgesData={specialBadges} />;
};

export default ViewSpecialBadges;
