"use client";
import { style } from "~/lib/styles";
type Props = {
  badge: {
    image: string;
    title: string;
    content: string;
    year: number;
  };
};
const SpecialBadge = (props: Props) => {
  const { image, title, content, year } = props.badge;
  return (
    <div
      className="flex gap-4 py-4"
      style={{
        borderBottom: "1px solid #afafaf",
      }}
    >
      <div className="w-[25%]">
        <img
          style={{
            aspectRatio: 1,
            borderRadius: "50%",
          }}
          src={image}
          alt=""
        />
      </div>
      <div className="flex w-[66%] flex-col justify-between">
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: style.color.fireRed,
            }}
          >
            {year}
          </div>
        </div>
        <div
          style={{
            fontSize: 10,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default SpecialBadge;
