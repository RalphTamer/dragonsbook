import { redirect } from "next/navigation";
import type { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = (await getServerAuthSession()) as unknown as NewSession;

  if (session?.user != null) {
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    }
    redirect(`/dragon-book`);
  } else {
    redirect("/auth/login");
  }
}
