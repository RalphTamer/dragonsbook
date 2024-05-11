import { Session } from "next-auth";

import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
  session: Session | null;
};
const Layout = (props: Props) => {
  const { session } = props;

  return (
    <>
      {session?.user != null && <Navbar session={session} />}
      {props.children}
    </>
  );
};

export default Layout;
