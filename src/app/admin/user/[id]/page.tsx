import { redirect } from "next/navigation";
import UserInfo from "~/app/_components/admin/UserInfo";
import type { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const EditUserInfo = async (props: {
  params: {
    id: string;
  };
}) => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/dragon-book/${session.user.id}`);
  }

  const userData = api.user.getUserById({
    id: props.params.id,
  });
  const specialBadges = api.admin.getSpecialBadgesByUserId({
    skip: 0,
    userId: props.params.id,
  });
  const allBadges = api.admin.getSpecialBadges({
    skip: 0,
  });

  const [userDataP, specialBadgesP, allBadgesP] = await Promise.all([
    userData,
    specialBadges,
    allBadges,
  ]);
  return (
    <UserInfo
      userData={userDataP}
      specialBadgesData={specialBadgesP}
      allBadges={allBadgesP}
    />
  );
};

export default EditUserInfo;
