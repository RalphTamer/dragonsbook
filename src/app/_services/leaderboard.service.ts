import { style } from "~/lib/styles";
import type { selectModalItems } from "~/lib/types";

export const getBgColor = (item: (typeof selectModalItems)[number]) => {
  if (item === "WIND") {
    return style.color.windYellow;
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
