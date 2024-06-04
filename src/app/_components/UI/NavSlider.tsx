"use client";

import { Fragment, useEffect } from "react";

import * as React from "react";
import SVGIcon from "./SVGIcon";
import { navStore } from "~/lib/store";
import type { NextFont } from "next/dist/compiled/@next/font";

type Props = {
  renderElem: JSX.Element;
  xColor?: string;
  edgeOfTheGalaxy: NextFont;
};
const NavSlider = (props: Props) => {
  const showSlideoutMenu = navStore((state) => state.showSlideoutMenu);
  const zIndex = 1000000;

  useEffect(() => {
    const elem = document.getElementById("NavSlider");
    if (elem == null) {
      if (showSlideoutMenu === true) {
        console.error("could not find #NavSlider");
      }
      return;
    }
    requestAnimationFrame(() => {
      elem.style.transform = `translate(${
        showSlideoutMenu === true ? "0%" : "100%"
      }, 0)`;
    });
  }, [showSlideoutMenu]);

  if (showSlideoutMenu === false) {
    return null;
  }
  return (
    <Fragment>
      <div
        onClick={() => navStore.setState({ showSlideoutMenu: false })}
        style={{
          display: showSlideoutMenu === true ? "block" : "none",
          position: "fixed",
          zIndex: zIndex - 1,
          left: 0,
          bottom: 0,
          top: 0,
          right: 0,
          height: "100%",
          width: "100vw",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      />
      <div
        id="NavSlider"
        style={{
          overflowX: "hidden",
          position: "fixed",
          zIndex: zIndex,
          // left: 0,
          bottom: 0,
          top: 0,
          right: 0,
          height: "100%",
          width: "100vw",
          maxWidth: 500,
          overflowY: "auto",
          boxShadow: "1px 1px 15px rgba(0,0,0,0.2)",
          backgroundColor: "#000",
          willChange: "transform",
          transition: "transform .4s cubic-bezier(.17,.67,.83,.97)",
          transform: `translate(100%, 0)`,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            paddingTop: "24px",
            paddingBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            marginRight: "16px",
            marginLeft: "16px",

            borderBottom: "1px solid #666",
            // paddingTop: "32px",
            // paddingBottom: "32px",
            // paddingLeft: "16px",
            // paddingRight: "16px",
            top: 0,
            zIndex: 10,
          }}
        >
          {/* <img src="/terminators/terminatorsLogo.png" alt="" />
           */}
          <div className="grid grid-cols-12 gap-4">
            <img src="/icons/logo.png" className="col-span-3" />
            <div
              className={`col-span-9 ${props.edgeOfTheGalaxy.className}`}
              style={{
                fontSize: 26,
                color: "white",
                letterSpacing: 2,
                fontWeight: "normal",
              }}
            >
              MENU
            </div>
          </div>
          <div onClick={() => navStore.setState({ showSlideoutMenu: false })}>
            <SVGIcon name="x" size={30} color={props.xColor ?? "unset"} />
          </div>
        </div>
        {props.renderElem}
      </div>
    </Fragment>
  );
};

export default NavSlider;
