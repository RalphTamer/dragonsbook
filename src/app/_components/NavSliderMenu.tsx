"use client";

import { signOut, useSession } from "next-auth/react";
import NavItem from "./NavItem";
import SlideoutMenu from "./UI/NavSlider";
import type { NextFont } from "next/dist/compiled/@next/font";
type Props = {
  id: string;
  edgeOfTheGalaxy: NextFont;
  pathname: string;
};
const NavSliderMenu = (props: Props) => {
  const { pathname } = props;

  return (
    <SlideoutMenu
      edgeOfTheGalaxy={props.edgeOfTheGalaxy}
      xColor="#fff"
      renderElem={
        pathname.startsWith("/admin") ? (
          <>
            <NavItem
              active={pathname === `/dragon-book/${props.id}`}
              href={`/dragon-book/${props.id}`}
              text="DRAGON BOOK"
              onClick={() => {}}
            />
            <NavItem
              active={pathname === `/admin`}
              href={`/admin`}
              text="ADMIN HOME"
              onClick={() => {}}
            />
            <NavItem
              active={pathname === `/admin/popup`}
              href={`/admin/popup`}
              text="ADD POPUP"
              onClick={() => {}}
            />
            <NavItem
              active={pathname === `/admin/special-badge/add`}
              href={`/admin/special-badge/add`}
              text="ADD SPECIAL BADGE"
              onClick={() => {}}
            />
            <NavItem
              active={pathname === `/admin/special-badge`}
              href={`/admin/special-badge`}
              text="VIEW SPECIAL BADGES"
              onClick={() => {}}
            />
            <NavItem
              active={pathname === `/admin/events/generate`}
              href={`/admin/events/generate`}
              text="GENERATE EVENTS"
              onClick={() => {}}
            />
            <NavItem
              active={pathname === `/admin/events`}
              href={`/admin/events`}
              text="VIEW EVENTS"
              onClick={() => {}}
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
              onClick={() => {}}
            />
            <NavItem
              active={pathname === "/leaderboard"}
              href="/leaderboard"
              text="LEADERBOARD"
              onClick={() => {}}
            />
            <NavItem
              active={pathname === "/scan-qr"}
              href="/scan-qr"
              text="SCAN QR"
              onClick={() => {}}
            />

            <NavItem
              active={pathname === "/"}
              href="/"
              text="CAMP49"
              onClick={() => {}}
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
