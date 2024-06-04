import { formatNumber } from "~/lib/utils";

type Props = {
  badgeName: string;
  color: string;
  subtitle: string;
  points: number;
  rank: number;
  image?: string;
};
const BadgesCard = (props: Props) => {
  return (
    <div
      className=" relative my-4 w-full items-center justify-between bg-[#000]"
      style={{ borderRadius: "12px" }}
    >
      <div className="flex w-[70%] space-x-2 py-4 pl-4">
        <div className="relative w-[25%]">
          <div
            className="absolute left-0 top-1/2"
            style={{
              transform: "translate(0,-50%)",
            }}
          >
            <img
              src={props.image ?? "/images/character.jpg"}
              alt=""
              style={{
                aspectRatio: 1,
                maxWidth: 50,
                // width: "100%",

                borderRadius: "10px",
              }}
            />
          </div>
        </div>
        <div style={{ fontSize: 10 }} className="flex flex-col justify-between">
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "white" }}>
              {props.badgeName}
            </div>
            <div style={{ color: props.color, fontWeight: "bold" }}>
              Rank #{props.rank}
            </div>
          </div>
          <div className="text-nowrap" style={{ color: "#e0e0e0" }}>
            {props.subtitle}
          </div>
        </div>
      </div>
      <div
        className={`absolute right-0 top-1/2 flex h-full items-center  justify-center  px-6`}
        style={{
          aspectRatio: 1,
          background: props.color,
          textAlign: "center",
          transform: "translate(0,-50%)",
          borderRadius: "12px",
        }}
      >
        <div className="relative">
          <div
            className="absolute left-1/2 top-1/2 flex flex-col"
            style={{
              lineHeight: 1,
              color: "#000",
              fontSize: 16,
              transform: "translate(-50%,-50%)",
            }}
          >
            {/* TODO handle if more than 1000 make 1k */}
            <div style={{ fontWeight: "bolder" }}>
              {formatNumber(props.points)}
            </div>
            <div style={{ fontSize: 8, fontWeight: "bolder" }}>PTS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesCard;
