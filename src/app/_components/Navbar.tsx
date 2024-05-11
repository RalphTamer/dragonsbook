"use client";
import { Session } from "next-auth";
import SVGIcon from "./UI/SVGIcon";
import SlideoutMenu from "./UI/SlideoutNav";
import { navStore } from "~/lib/store";
import CollapsibleItem from "./UI/CollapsibleItem";
import { signOut } from "next-auth/react";
import Link from "./UI/Link";

// {session?.user != null ? (
//     <div onClick={() => signOut()}>log out</div>
//   ) : (
//     <Link href={"/auth/login"}>log in</Link>
//   )}
type Props = {
  session: Session | null;
};
const Navbar = (props: Props) => {
  console.log("render");
  return (
    <>
      <div className="container ">
        <div
          className="mt-4 flex justify-between py-6"
          style={{
            // backgroundColor: "green",
            borderTop: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Link href={"/"}>LOGO</Link>
          <div
            onClick={() => {
              navStore.setState({
                showSlideoutMenu: true,
              });
            }}
          >
            <SVGIcon name="menu-icon" />
          </div>
        </div>
      </div>
      <SlideoutMenu
        renderElem={
          <>
            <div
              onClick={() => {
                signOut();
              }}
            >
              log out
            </div>
            <Link href={"/leaderboard"}>leaderboard</Link>
            <CollapsibleItem
              id="ads"
              title={<div>test</div>}
              renderBody={() => <div>content</div>}
            />
          </>
        }
      />
    </>
  );
};

export default Navbar;
