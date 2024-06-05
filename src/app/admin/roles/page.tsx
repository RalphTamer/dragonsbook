import { redirect } from "next/navigation";
import PopupPage from "~/app/_components/admin/PopupPage";
import type { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const AddPopup = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/dragon-book/${session.user.id}`);
  }
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }
  const res = await api.admin.makeMeAdmin();
  if (res.success === true) {
    redirect("/admin");
  } else {
    redirect("/dragon-book");
  }
};

export default AddPopup;
