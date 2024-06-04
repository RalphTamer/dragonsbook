import { redirect } from "next/navigation";
import { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = (await getServerAuthSession()) as unknown as NewSession;

  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role === "ADMIN") {
    redirect("/admin");
  } else {
    redirect(`/dragon-book/${session.user.id}`);
  }
}
