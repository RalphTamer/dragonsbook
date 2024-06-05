import type { Session } from "next-auth";

import type { ReactNode } from "react";
import Footer from "./Footer";
import type { NextFont } from "next/dist/compiled/@next/font";
import Navbar from "./Navbar";
import { api } from "~/trpc/server";

type Props = {
  children: ReactNode;
  session: Session | null;
  edgeOfTheGalaxy: NextFont;
};
const Layout = async (props: Props) => {
  const session = props.session;
  const popupData = await api.user.getPopupData();
  return (
    <>
      {session?.user != null && (
        <Navbar
          popupData={popupData}
          edgeOfTheGalaxy={props.edgeOfTheGalaxy}
          id={session.user.id}
        />
      )}
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
