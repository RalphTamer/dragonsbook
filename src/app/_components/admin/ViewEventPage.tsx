"use client";
import type { Event } from "@prisma/client";
import SVGIcon from "../UI/SVGIcon";
import { style } from "~/lib/styles";
import { useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";
import AsyncButton from "../UI/AsyncButton";

type Props = {
  event: Event;
};
const ViewEventPage = (props: Props) => {
  const [isActive, setisActive] = useState<boolean>(props.event.active);
  return (
    <div className="container">
      <div
        className="space-y-2"
        style={{
          width: "100%",
          height: "50vh",
          aspectRatio: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.event.qr != null ? (
          <Image
            src={props.event.qr}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{
              width: "100%",
              height: "100%",
              //
            }}
          />
        ) : (
          <div>No qr image available</div>
        )}
        <div style={{ fontWeight: "bold" }}>{props.event.name}</div>
      </div>
      <div>Type: {props.event.type} </div>
      <div>Will add: {props.event.pointsAdded} points</div>
      <div className="space-y-4">
        <AsyncButton
          buttonText={isActive === true ? "DISABLE EVENT" : "ENABLE EVENT"}
          onClick={async () => {
            await api.admin.toggleActiveEvent.query({
              active: isActive === true ? false : true,
              eventId: props.event.id,
            });
            setisActive(isActive === true ? false : true);
          }}
          style={{
            borderRadius: 12,
            background: style.color.fireRed,
          }}
          className={` px-4 py-2 text-center  text-white`}
        />
        <AsyncButton
          buttonText="DELETE EVENT"
          onClick={async () => {
            if (
              window.confirm("are you sure you want to delete the events?") ===
              true
            ) {
              await api.admin.deleteEvent.query({
                id: props.event.id,
              });
              if (typeof window != null) {
                window.location.href = "/admin/events";
              }
            }
          }}
          style={{
            borderRadius: 12,
            background: style.color.fireRed,
          }}
          className={` px-4 py-2 text-center  text-white`}
        />
      </div>
    </div>
  );
};

export default ViewEventPage;
