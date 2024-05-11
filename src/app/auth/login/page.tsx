import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "~/app/_components/LoginForm";
import { authOptions } from "~/server/auth";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session != null) {
    redirect("/");
  }
  return <LoginForm />;
};

export default Login;
