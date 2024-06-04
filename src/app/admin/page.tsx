import { getServerAuthSession } from "~/server/auth";

import { redirect } from "next/navigation";
import AdminHomePage from "../_components/admin/AdminHomePage";
import { api } from "~/trpc/server";
import { NewSession } from "~/lib/types";

const Admin = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  if (session?.user == null) {
    redirect("/auth/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/dragon-book/${session.user.id}`);
  }

  const allUsers = await api.admin.getAllUsers({
    skip: 0,
    q: null,
  });

  return <AdminHomePage users={allUsers} />;
};

export default Admin;
