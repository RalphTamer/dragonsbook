"use client";
import NextLink from "next/link";
import React, { CSSProperties, ReactNode } from "react";
import { navStore } from "~/lib/store";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};
const Link = (props: Props) => {
  return (
    <NextLink
      onClick={() => {
        navStore.setState({
          showSlideoutMenu: false,
        });
      }}
      href={props.href}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </NextLink>
  );
};

export default Link;
