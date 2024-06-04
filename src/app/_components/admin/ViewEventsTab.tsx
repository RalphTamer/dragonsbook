"use client";
import { Event } from "@prisma/client";
import { useState } from "react";
import { style } from "~/lib/styles";
import { api } from "~/trpc/react";
import SVGIcon from "../UI/SVGIcon";
import Link from "next/link";

type Props = {
  allEvents: { allEvents: Event[]; allEventsCount: number };
};

const ViewEventsTab = (props: Props) => {
  const skipNum = 6;
  const [skip, setSkip] = useState<number>(skipNum);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allEvents, setAllEvents] = useState<Props["allEvents"]["allEvents"]>(
    props.allEvents.allEvents,
  );
  return (
    <div className="container">
      <div
        className="mt-2 text-center"
        style={{
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        VIEW EVENTS
      </div>
      {allEvents.map((event) => {
        return (
          <Link
            href={`/admin/events/${event.id}`}
            key={event.id}
            className="my-4 flex gap-4"
          >
            <img
              style={{
                aspectRatio: 1,
                maxWidth: 50,
              }}
              src={`/icons/${event.type.toLowerCase()}-badge.png`}
            ></img>
            <div>
              <div>
                <span style={{ fontWeight: "bold" }}>Name :</span> {event.name}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>
                  Points given on scan :{" "}
                </span>
                {event.pointsAdded}
              </div>

              <div>
                <span style={{ fontWeight: "bold" }}>Event Type : </span>
                {event.type}
              </div>
            </div>
          </Link>
        );
      })}
      <div className="flex justify-center">
        <button
          disabled={
            allEvents.length === props.allEvents.allEventsCount ||
            isLoading === true
          }
          className={` px-4 py-2 text-center  text-white`}
          style={{
            borderRadius: 12,
            background: style.color.fireRed,
          }}
          onClick={async () => {
            setIsLoading(true);
            await api.admin.getAllEvents
              .query({
                skip,
              })
              .then((data) => {
                setAllEvents((prev) => {
                  return [...prev, ...data.allEvents];
                });
                setSkip((prev) => prev + skipNum);
              });
            setIsLoading(false);
          }}
        >
          {isLoading === true ? (
            <SVGIcon name="loader" className="animate-spin" color="white" />
          ) : allEvents.length === props.allEvents.allEventsCount ? (
            "No More"
          ) : (
            "Load more"
          )}
        </button>
      </div>
    </div>
  );
};

export default ViewEventsTab;
