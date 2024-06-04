"use client";
import { NextFont } from "next/dist/compiled/@next/font";
import { useState } from "react";
import GenerateEventsTab from "./GenerateEventsTab";
import ViewEventsTab from "./ViewEventsTab";
import { Event } from "@prisma/client";
import Link from "next/link";

type Props = {
  edgeOfTheGalaxy: NextFont;
};
const GenerateEventsPage = (props: Props) => {
  return (
    <div className="container">
      <div className="my-4 flex justify-between">
        <div
          style={{
            letterSpacing: 1,
            fontSize: 24,
            lineHeight: 0.9,
            fontWeight: 200,
            color: "#000",
          }}
          className={`${props.edgeOfTheGalaxy.className}`}
        >
          GENERATE
        </div>
        <Link
          href={"/admin/events"}
          style={{
            letterSpacing: 1,
            fontSize: 24,
            lineHeight: 0.9,
            fontWeight: 200,
            color: "#000",
          }}
          className={`${props.edgeOfTheGalaxy.className}`}
        >
          VIEW
        </Link>
      </div>

      <GenerateEventsTab />
    </div>
  );
};

export default GenerateEventsPage;
