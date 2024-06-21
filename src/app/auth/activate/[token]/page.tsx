import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

const Activate = async (props: {
  params: {
    token: string;
  };
}) => {
  const res = await api.auth.verifyUser({
    token: props.params.token,
  });
  if (res.success === true) {
    redirect("/auth/login");
  }
};

export default Activate;
