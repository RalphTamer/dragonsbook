"use client";
import Image from "next/image";
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
      className="flex items-center gap-4  py-4"
      style={{
        borderBottom: "1px solid #afafaf",
      }}
    >
      <div className="h-full w-[25%]">
        <Image
          src={image}
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
            borderRadius: "100%",
          }}
        />
      </div>
      <div className="flex w-[75%] flex-col justify-between py-4">
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
