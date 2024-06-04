import { useState } from "react";
import { style } from "~/lib/styles";
import { api } from "~/trpc/react";
import AsyncButton from "../UI/AsyncButton";
import { User } from "@prisma/client";

type DragonPoints = {
  airPoints: number;
  firePoints: number;
  waterPoints: number;
  earthPoints: number;
};
type Props = {
  userData: Omit<User, "password">;
};
const EditPointsPage = (props: Props) => {
  const [dragonPoints, setDragonPoints] = useState<DragonPoints>({
    airPoints: props.userData.airPoints,
    firePoints: props.userData.firePoints,
    earthPoints: props.userData.earthPoints,
    waterPoints: props.userData.waterPoints,
  });
  const [message, setMessage] = useState<{
    type: "error" | "success";
    payload: string;
  } | null>(null);

  const dragonPointsArray: {
    name: string;
    value: keyof DragonPoints;
  }[] = [
    {
      name: "air points",
      value: "airPoints",
    },
    {
      name: "fire points",
      value: "firePoints",
    },
    {
      name: "water points",
      value: "waterPoints",
    },
    {
      name: "earth points",
      value: "earthPoints",
    },
  ];
  return (
    <>
      <div className="space-y-2 ">
        {dragonPointsArray.map((dragonPointData) => {
          return (
            <div key={dragonPointData.value} className="flex items-center ">
              <div className="w-[40%]">{dragonPointData.name}</div>
              <div className="flex w-[20%] ">
                <input
                  className="px-2 py-1"
                  style={{
                    width: "100%",
                  }}
                  type="number"
                  value={dragonPoints[dragonPointData.value]}
                  onChange={(e) => {
                    setDragonPoints((prev) => {
                      return {
                        ...prev,
                        [dragonPointData.value]: isNaN(parseInt(e.target.value))
                          ? 0
                          : parseInt(e.target.value),
                      };
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {message != null && (
        <div
          className="text-center"
          style={{
            fontWeight: 500,
            color:
              message.type === "success"
                ? style.color.earthGreen
                : style.color.fireRed,
          }}
        >
          {message.payload}
        </div>
      )}
      <AsyncButton
        onClick={async () => {
          const res = await api.admin.changeUserPoints.query({
            ...dragonPoints,
            userId: props.userData.id,
          });

          setMessage({
            payload: res.message,
            type: res.success === true ? "success" : "error",
          });
        }}
        buttonText="SAVE"
        style={{
          borderRadius: 18,
          backgroundColor: style.color.fireRed,
          color: "white",
          fontWeight: "bold",
        }}
      />
    </>
  );
};

export default EditPointsPage;
