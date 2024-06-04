import { redirect } from "next/navigation";
import ViewEventsTab from "~/app/_components/admin/ViewEventsTab";
import { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const ViewEvents = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/dragon-book/${session.user.id}`);
  }

  const allEvents = await api.admin.getAllEvents({
    skip: 0,
  });
  return <ViewEventsTab allEvents={allEvents} />;
};

export default ViewEvents;
