export type UserAttendance = ({
  attendedEvent: {
    id: string;
    type: string;
    name: string;
    qr: string;
  };
} & {
  id: string;
  userId: string;
  eventId: string;
})[];
export const getCompletedEventByType = (UserAttendance: UserAttendance) => {
  let completedwindEvents = 0;
  let completedFireEvents = 0;
  let completedWaterEvents = 0;
  let completedEarthEvents = 0;
  UserAttendance.forEach((event) => {
    if (event.attendedEvent.type === "WIND") {
      completedwindEvents++;
    } else if (event.attendedEvent.type === "WATER") {
      completedWaterEvents++;
    } else if (event.attendedEvent.type === "FIRE") {
      completedFireEvents++;
    } else {
      completedEarthEvents++;
    }
  });

  return {
    completedwindEvents,
    completedFireEvents,
    completedWaterEvents,
    completedEarthEvents,
  };
};
