import { style } from "~/lib/styles";
import { selectModalItems } from "../_components/Leaderboard";

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
    return "linear-gradient(90deg, rgba(252,62,46,1) 0%, rgba(4,191,255,1) 27%, rgba(125,160,97,1) 54%, rgba(253,184,0,1) 100%)";
  }
};
