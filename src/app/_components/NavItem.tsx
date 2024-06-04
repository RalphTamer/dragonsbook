"use client";
import { style } from "~/lib/styles";
import Link from "./UI/Link";
import { MouseEventHandler } from "react";

type NavItemProps = {
  active?: boolean;
  text: string;
  href?: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const NavItem = (props: NavItemProps) => {
  return (
    <div
      className="mx-4 py-8 text-center"
      onClick={props.onClick}
      style={{
        color: props.active === true ? "#ff3b31" : "#fff",
        borderBottom:
          props.active === true ? `1px solid #ff3b31 ` : "1px solid #666",
      }}
    >
      {props.href != null ? (
        <Link href={props.href}>{props.text}</Link>
      ) : (
        props.text
      )}
    </div>
  );
};
export default NavItem;
