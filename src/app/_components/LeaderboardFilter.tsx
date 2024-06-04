import { selectModalItems } from "~/lib/types";
import { humanize } from "~/lib/utils";
import { api } from "~/trpc/react";
import { getBgColor } from "../_services/leaderboard.service";
import BottomSlideModal from "./UI/BottomSlideModal";
import SVGIcon from "./UI/SVGIcon";
import { useState } from "react";

type Props = {
  selectedFilterValue: "FIRE" | "WATER" | "AIR" | "EARTH" | "ALL";
  onChangeModalValue: (item: "FIRE" | "WATER" | "AIR" | "EARTH" | "ALL") => {};
};

const LeaderboardFilter = (props: Props) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedFilterValue } = props;
  return (
    <div
      className="mb-4 flex justify-between py-4"
      style={{ fontSize: 13, borderBottom: "1px solid #ccc" }}
    >
      <div className="flex items-center space-x-1">
        <SVGIcon name="filter" size={16} />
        <div className="flex items-center space-x-1">
          <div
            className="flex items-center space-x-1"
            onClick={() => {
              setModalIsVisible(true);
            }}
          >
            <div>filter by : </div>
            <div>{humanize(selectedFilterValue)}</div>
          </div>
          <BottomSlideModal
            isOpen={modalIsVisible}
            onClose={() => {
              setModalIsVisible(false);
            }}
          >
            <div className="container mb-4 space-y-2">
              <div className="text-center text-[16px] font-bold uppercase">
                Filter By
              </div>
              {isLoading == false ? (
                selectModalItems.map((item) => {
                  return (
                    <div
                      key={item}
                      style={{
                        background:
                          item === selectedFilterValue
                            ? getBgColor(item)
                            : "#8b8b8b",
                        borderRadius: "12px",
                      }}
                      className="  py-2 text-center text-[18px] text-white"
                      onClick={async () => {
                        setModalIsVisible(false);
                        setIsLoading(true);
                        props.onChangeModalValue(item);

                        setIsLoading(false);
                      }}
                    >
                      {humanize(item)}
                    </div>
                  );
                })
              ) : (
                <div>loading...</div>
              )}
            </div>
          </BottomSlideModal>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardFilter;
