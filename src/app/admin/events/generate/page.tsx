import localFont from "next/font/local";
import { redirect } from "next/navigation";
import GenerateEventsPage from "~/app/_components/admin/GenerateEventsPage";
import type { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";
const edgeOfTheGalaxy = localFont({
  src: "../../../_fonts/EdgeOfTheGalaxyPoster-3zRAp.otf",
});
const GenerateEvents = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/dragon-book/${session.user.id}`);
  }

  return <GenerateEventsPage edgeOfTheGalaxy={edgeOfTheGalaxy} />;
};

export default GenerateEvents;
