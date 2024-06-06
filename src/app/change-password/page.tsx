import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import UpdatePasswordPage from "../_components/UpdatePasswordPage";

const ChangePassword = async () => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/auth/login");
  }

  return <UpdatePasswordPage />;
};

export default ChangePassword;
