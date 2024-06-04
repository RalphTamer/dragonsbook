import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

const DragonBook = async () => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/auth/login");
  }
  redirect(`/dragon-book/${session.user.id}`);
};

export default DragonBook;
