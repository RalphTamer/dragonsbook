export const getDataBasedOnEventType = (args: {
  points: number;
  eventType: string;
}) => {
  const { eventType, points } = args;
  let data = {};
  if (eventType === "FIRE") {
    data = {
      firePoints: {
        increment: points,
      },
      totalPoints: {
        increment: points,
      },
    };
  } else if (eventType === "AIR") {
    data = {
      airPoints: {
        increment: points,
      },
      totalPoints: {
        increment: points,
      },
    };
  } else if (eventType === "WATER") {
    data = {
      waterPoints: {
        increment: points,
      },
      totalPoints: {
        increment: points,
      },
    };
  } else if (eventType === "EARTH") {
    data = {
      earthPoints: {
        increment: points,
      },
      totalPoints: {
        increment: points,
      },
    };
  }
  return data;
};
