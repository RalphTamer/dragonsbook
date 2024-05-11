type Props = {
  username: string;
  attendedEvents: number;
  totalPoints: number;
  squareBgColor: string;
};
const LeaderboardCard = (props: Props) => {
  return (
    <div
      className=" relative my-4 w-full items-center justify-between bg-[#ccc]"
      style={{ borderRadius: "12px" }}
    >
      <div className="flex w-[70%] space-x-2 py-4 pl-4">
        <div className="w-[25%] ">
          <img
            src="/images/character.jpg"
            alt=""
            style={{
              aspectRatio: 1,
              borderRadius: "10px",
            }}
          />
        </div>
        <div style={{ fontSize: 10 }} className="flex flex-col justify-between">
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: "bold" }}>
              {props.username}
            </div>
            <div style={{ color: "red", fontWeight: "bold" }}>Rank #1</div>
          </div>
          <div>Events Completed: {props.attendedEvents}</div>
        </div>
      </div>
      <div
        className={`absolute right-0 top-1/2 flex h-full  items-center  px-6`}
        style={{
          background: props.squareBgColor,
          textAlign: "center",
          transform: "translate(0,-50%)",
          borderRadius: "12px",
        }}
      >
        <div className="flex flex-col" style={{ lineHeight: 1 }}>
          {/* TODO handle if more than 1000 make 1k */}
          {/* TODO show points related to filter value */}
          <div style={{ fontWeight: "bold" }}>{props.totalPoints}</div>
          <div style={{ fontSize: 10 }}>PTS</div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
