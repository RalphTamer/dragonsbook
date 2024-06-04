import { redirect } from "next/navigation";
import AddSpecialBadgePage from "~/app/_components/admin/AddSpecialBadgePage";
import { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";

const AddSpecialBadge = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/dragon-book/${session.user.id}`);
  }
  return <AddSpecialBadgePage />;
};

export default AddSpecialBadge;
