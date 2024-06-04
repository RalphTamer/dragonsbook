import { redirect } from "next/navigation";
import ViewEventPage from "~/app/_components/admin/ViewEventPage";
import { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const ViewEvent = async (props: {
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
  const event = await api.admin.getEventById({
    id: props.params.id,
  });

  return <ViewEventPage event={event} />;
};

export default ViewEvent;
