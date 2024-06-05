import { redirect } from "next/navigation";
import type { NewSession } from "~/lib/types";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const AddPopup = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  }
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }
  const res = await api.admin.makeMeAdmin();
  console.log(res);

  if (res.success === true) {
    redirect("/admin");
  } else {
    redirect("/dragon-book");
  }
};

export default AddPopup;
