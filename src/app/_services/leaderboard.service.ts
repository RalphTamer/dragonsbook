import { style } from "~/lib/styles";
import { selectModalItems } from "~/lib/types";

export const getBgColor = (item: (typeof selectModalItems)[number]) => {
  if (item === "AIR") {
    return style.color.airYellow;
  } else if (item === "EARTH") {
    return style.color.earthGreen;
  } else if (item === "FIRE") {
    return style.color.fireRed;
  } else if (item === "WATER") {
    return style.color.waterBlue;
  } else {
    return "#1c1d1d";
  }
};
