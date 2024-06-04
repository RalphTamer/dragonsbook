import { redirect } from "next/navigation";
import LoginForm from "~/app/_components/Login";
import { getServerAuthSession } from "~/server/auth";


const Login = async () => {
  const session = await getServerAuthSession();
  if (session != null) {
    redirect("/");
  }
  return <LoginForm />;
};

export default Login;
