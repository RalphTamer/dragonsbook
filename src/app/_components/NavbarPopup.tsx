"use client";
import { useState } from "react";
import SVGIcon from "./UI/SVGIcon";
import { style } from "~/lib/styles";

type Props = {
  visible: boolean;
  day: number;
  month: string;
  title: string;
  content: string;
  link: string;
};
export const NavbarPopup = (props: Props) => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(props.visible);
  if (isPopupVisible === false) return;
  return (
    <>
      <div
        className="relative"
        style={{
          backgroundColor: style.color.fireRed,
        }}
      >
        <a
          href={props.link}
          target="_blank"
          className="container flex gap-4 py-8"
        >
          <div
            className="relative flex w-[25%] flex-col items-center justify-center bg-black text-white"
            style={{
              borderRadius: 18,
              aspectRatio: 1,
            }}
          >
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                transform: "translate(-50%,-50%)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  lineHeight: 1,
                  fontWeight: "bold",
                }}
              >
                {props.day}
              </div>
              <div
                style={{
                  fontSize: 12,
                  lineHeight: 1.2,
                  textAlign: "center",
                }}
              >
                {props.month}
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {props.title}
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: 16,
              }}
            >
              {props.content}
            </div>
          </div>
        </a>
        <div
          onClick={() => {
            setIsPopupVisible(false);
          }}
          className="absolute"
          style={{
            top: 15,
            right: 15,
          }}
        >
          <SVGIcon name="x" size={30} color="#000" />
        </div>
      </div>
    </>
  );
};
