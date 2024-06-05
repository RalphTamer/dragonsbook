"use client";
import SVGIcon from "./UI/SVGIcon";
import { navStore } from "~/lib/store";
import Link from "./UI/Link";
import NavSliderMenu from "./NavSliderMenu";
import { usePathname } from "next/navigation";
import { humanizePaths } from "~/lib/utils";
import type { NextFont } from "next/dist/compiled/@next/font";
import { NavbarPopup } from "./NavbarPopup";
import type { Popup } from "@prisma/client";
import Image from "next/image";
type Props = {
  id: string;
  edgeOfTheGalaxy: NextFont;
  popupData: Popup | null;
};
const Navbar = (props: Props) => {
  const pathname = usePathname();
  return (
    <>
      {props.popupData != null && pathname.startsWith("/admin") === false && (
        <NavbarPopup
          link={props.popupData.link}
          day={props.popupData.day}
          month={props.popupData.month}
          title={props.popupData.title}
          content={props.popupData.content}
          visible={props.popupData != null}
        />
      )}
      <div className="container ">
        <div
          className="mt-4 flex justify-between pb-3 pt-6"
          style={{
            // backgroundColor: "green",
            borderTop: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <Image
                className="pb-3"
                src={"/icons/logo.png"}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                priority
                style={{
                  // width: "100%",
                  height: "100%",
                  //
                  width: "29px",
                }}
              />
            </Link>
            <div
              className={`${props.edgeOfTheGalaxy.className}`}
              style={{
                letterSpacing: 1,
                fontSize: 28,
                lineHeight: 0.9,
                fontWeight: 200,
              }}
            >
              {humanizePaths(pathname)}
            </div>
          </div>
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
      <NavSliderMenu
        pathname={pathname}
        id={props.id}
        edgeOfTheGalaxy={props.edgeOfTheGalaxy}
      />
    </>
  );
};

export default Navbar;
