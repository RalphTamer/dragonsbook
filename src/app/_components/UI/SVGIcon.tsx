"use client";
import type { CSSProperties } from "react";
import React, { Fragment } from "react";

type Props = {
  color?: string;
  size?: number;
  fill?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  className?: string;
  name:
    | "search"
    | "x"
    | "chevron-right"
    | "chevron-down"
    | "chevron-left"
    | "ant"
    | "user-check"
    | "location-pin"
    | "phone"
    | "menu-icon"
    | "minus"
    | "plus"
    | "filter"
    | "flame"
    | "pencil"
    | "loader"
    | "check"
    | "instagram"
    | "exclamation";
};

const SVGIcon = (props: Props) => {
  const strokeColor = props.color ?? "#000";
  const size = props.size ?? 26;
  const strokeWidth = props.strokeWidth ?? 1.5;
  const fill = props.fill ?? "none";

  let svgInnerElem: null | JSX.Element;

  if (props.name === "x") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </Fragment>
    );
  } else if (props.name === "search") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </Fragment>
    );
  } else if (props.name === "location-pin") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
      </Fragment>
    );
  } else if (props.name === "check") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l5 5l10 -10" />
      </Fragment>
    );
  } else if (props.name === "phone") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
      </Fragment>
    );
  } else if (props.name === "chevron-right") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 6l6 6l-6 6" />
      </Fragment>
    );
  } else if (props.name === "chevron-down") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9l6 6l6 -6" />
      </Fragment>
    );
  } else if (props.name === "chevron-left") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 6l-6 6l6 6" />
      </Fragment>
    );
  } else if (props.name === "menu-icon") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
      </Fragment>
    );
  } else if (props.name === "ant") {
    svgInnerElem = (
      <Fragment>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082"
        />
      </Fragment>
    );
  } else if (props.name === "user-check") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
        <path d="M15 19l2 2l4 -4" />
      </Fragment>
    );
  } else if (props.name === "plus") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </Fragment>
    );
  } else if (props.name === "minus") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
      </Fragment>
    );
  } else if (props.name === "filter") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
      </Fragment>
    );
  } else if (props.name === "flame") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
      </Fragment>
    );
  } else if (props.name === "pencil") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
        <path d="M13.5 6.5l4 4" />
      </Fragment>
    );
  } else if (props.name === "exclamation") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 9v4" />
        <path d="M12 16v.01" />
      </Fragment>
    );
  } else if (props.name === "instagram") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M16.5 7.5l0 .01" />
      </Fragment>
    );
  } else if (props.name === "loader") {
    svgInnerElem = (
      <Fragment>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </Fragment>
    );
  } else {
    return null;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icn icon-tabler ${props.className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={props.style}
    >
      {svgInnerElem}
    </svg>
  );
};
export default SVGIcon;
