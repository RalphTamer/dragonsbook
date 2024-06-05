"use client";

import { useState } from "react";
import SVGIcon from "./SVGIcon";

type Props = {
  disabled?: boolean;
  style: React.CSSProperties;
  onClick: () => Promise<void>;
  buttonText: string;
};
const AsyncButton = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex justify-center">
      <button
        disabled={props.disabled ?? isLoading === true}
        className={` px-4 py-2 text-center  text-white`}
        style={{
          ...props.style,
        }}
        onClick={async () => {
          setIsLoading(true);
          await props.onClick();
          setIsLoading(false);
        }}
      >
        {isLoading === true ? (
          <SVGIcon name="loader" className="animate-spin" color="white" />
        ) : (
          props.buttonText
        )}
      </button>
    </div>
  );
};

export default AsyncButton;
