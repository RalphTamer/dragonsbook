import { redirect } from "next/navigation";
import SpecialBadgePage from "~/app/_components/admin/SpecialBadgePage";
import { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";

const SpecialBadge = async (props: {
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

  return <SpecialBadgePage />;
};

export default SpecialBadge;
