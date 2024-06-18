"use client";

import { signOut } from "next-auth/react";
import NavItem from "./NavItem";
import NavSlider from "./UI/NavSlider";
import type { NextFont } from "next/dist/compiled/@next/font";
type Props = {
  id: string;
  edgeOfTheGalaxy: NextFont;
  pathname: string;
};
const NavSliderMenu = (props: Props) => {
  const { pathname } = props;

  return (
    <NavSlider
      edgeOfTheGalaxy={props.edgeOfTheGalaxy}
      xColor="#fff"
      renderElem={
        pathname.startsWith("/admin") ? (
          <>
            <NavItem
              active={pathname === `/dragon-book/${props.id}`}
              href={`/dragon-book/${props.id}`}
              text="DRAGON BOOK"
            />
            <NavItem
              active={pathname === `/admin`}
              href={`/admin`}
              text="ADMIN HOME"
            />
            <NavItem
              active={pathname === `/admin/popup`}
              href={`/admin/popup`}
              text="ADD POPUP"
            />
            <NavItem
              active={pathname === `/admin/special-badge/add`}
              href={`/admin/special-badge/add`}
              text="ADD SPECIAL BADGE"
            />
            <NavItem
              active={pathname === `/admin/special-badge`}
              href={`/admin/special-badge`}
              text="VIEW SPECIAL BADGES"
            />
            <NavItem
              active={pathname === `/admin/events/generate`}
              href={`/admin/events/generate`}
              text="GENERATE EVENTS"
            />
            <NavItem
              active={pathname === `/admin/events`}
              href={`/admin/events`}
              text="VIEW EVENTS"
            />
            <NavItem
              text="LOGOUT"
              onClick={async () => {
                await signOut({
                  callbackUrl: "/auth/login",
                });
              }}
            />
          </>
        ) : (
          <>
            <NavItem
              active={pathname === `/dragon-book/${props.id}`}
              href={`/dragon-book/${props.id}`}
              text="DRAGON BOOK"
            />
            <NavItem
              active={pathname === "/leaderboard"}
              href="/leaderboard"
              text="LEADERBOARD"
            />
            <NavItem
              active={pathname === "/scan-qr"}
              href="/scan-qr"
              text="SCAN QR"
            />

            <NavItem
              active={false}
              href="https://www.camp49.com/theapp"
              text="CAMP49"
            />
            <NavItem
              text="LOGOUT"
              onClick={async () => {
                await signOut({
                  callbackUrl: "/auth/login",
                });
              }}
            />
          </>
        )
      }
    />
  );
};

export default NavSliderMenu;
