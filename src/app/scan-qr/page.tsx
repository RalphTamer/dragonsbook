import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import ScanQrPage from "../_components/ScanQrPage";

const ScanQr = async () => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/auth/login");
  }

  return <ScanQrPage />;
};

export default ScanQr;
