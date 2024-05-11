"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect } from "react";
type Props = {
  children: ReactNode;
};
const SessionProviderWrapper = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default SessionProviderWrapper;
