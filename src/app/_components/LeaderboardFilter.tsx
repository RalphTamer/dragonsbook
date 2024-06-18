import { selectModalItems } from "~/lib/types";
import { humanize } from "~/lib/utils";
import { getBgColor } from "../_services/leaderboard.service";
import BottomSlideModal from "./UI/BottomSlideModal";
import SVGIcon from "./UI/SVGIcon";
import { useState } from "react";
import Image from "next/image";

type Props = {
  selectedFilterValue: "FIRE" | "WATER" | "WIND" | "EARTH" | "ALL";
  onChangeModalValue: (
    item: "FIRE" | "WATER" | "WIND" | "EARTH" | "ALL",
  ) => void;
};

const LeaderboardFilter = (props: Props) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedFilterValue } = props;
  return (
    <>
      <div
        className="mb-4 flex items-center justify-between py-4"
        style={{ fontSize: 13, borderBottom: "1px solid #ccc" }}
      >
        <div className=" space-x-1">
          <div className="flex  items-center space-x-1">
            <div>
              <SVGIcon className="flex " name="antenna-bars" size={26} />
            </div>
            <div
              className="flex items-center space-x-1"
              onClick={() => {
                setModalIsVisible(true);
              }}
            >
              <div>Filter by : </div>
              <div>{humanize(selectedFilterValue)}</div>
            </div>
          </div>
        </div>
        {selectedFilterValue === "ALL" ? (
          <div className="flex items-center space-x-2">
            {["wind", "fire", "earth", "water"].map((element) => {
              return (
                <Image
                  key={element}
                  src={`/icons/${element}-badge.png`}
                  alt="image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  style={{
                    width: "100%",
                    height: "100%",
                    //
                    maxWidth: 20,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <Image
            src={`/icons/${selectedFilterValue.toLowerCase()}-badge.png`}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{
              width: "100%",
              height: "100%",
              //
              maxWidth: 20,
            }}
          />
        )}
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
    </>
  );
};

export default LeaderboardFilter;
