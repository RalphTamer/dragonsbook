import { redirect } from "next/navigation";
import PopupPage from "~/app/_components/admin/PopupPage";
import { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";

const AddPopup = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/dragon-book/${session.user.id}`);
  }

  return <PopupPage />;
};

export default AddPopup;
