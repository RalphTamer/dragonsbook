import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "~/lib/utils";

type Props = {
  username: string;
  attendedEvents: number;
  totalPoints: number;
  squareBgColor: string;
  fontColor?: string;
  rank: number;
  image?: string | null;
  userId: string;
};
const LeaderboardCard = (props: Props) => {
  const fontColor = props.fontColor ?? "unset";

  return (
    <Link href={`/dragon-book/${props.userId}`}>
      <div
        className=" relative my-4 w-full items-center justify-between bg-[#ccc]"
        style={{ borderRadius: "12px" }}
      >
        <div className="flex w-[70%] space-x-2 py-4 pl-4">
          <div className="w-[25%] ">
            <Image
              src={props.image ?? "/images/character.jpg"}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              priority
              style={{
                width: "100%",
                height: "100%",
                //
                aspectRatio: 1,
                borderRadius: "10px",
              }}
            />
          </div>
          <div
            style={{ fontSize: 10 }}
            className="flex flex-col justify-between"
          >
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 14, fontWeight: "bold" }}>
                {props.username}
              </div>
              <div style={{ color: "red", fontWeight: "bold" }}>
                Rank #{props.rank}
              </div>
            </div>
            <div>Events Completed: {props.attendedEvents}</div>
          </div>
        </div>
        <div
          className={`absolute right-0 top-1/2 flex h-full items-center  justify-center  px-6`}
          style={{
            aspectRatio: 1,
            maxWidth: "fit-content",
            background: props.squareBgColor,
            textAlign: "center",
            transform: "translate(0,-50%)",
            borderRadius: "12px",
          }}
        >
          <div className="relative">
            <div
              className="absolute left-1/2 top-1/2 flex flex-col  "
              style={{
                lineHeight: 1,
                color: fontColor,
                transform: "translate(-50%,-50%)",
              }}
            >
              {/* TODO handle if more than 1000 make 1k */}
              <div style={{ fontWeight: "bold", fontSize: 16 }}>
                {formatNumber(props.totalPoints)}
              </div>
              <div style={{ fontSize: 10 }}>PTS</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LeaderboardCard;
