"use client";

import { Formik, Form } from "formik";
import { useRef, useState } from "react";
import { style } from "~/lib/styles";
import { generateEventSchema } from "~/schema";
import { api } from "~/trpc/react";
import CustomInput from "../UI/CustomInput";
import SVGIcon from "../UI/SVGIcon";
import { eventTypeOptions } from "~/app/_services/admin.service";

const GenerateEventsTab = () => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    payload: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // TODO check whhy three renders
  //   console.log("render");
  // TODO CLEANUP

  return (
    <div className="container">
      <div
        style={{
          fontWeight: "bold",
        }}
        className=" my-2 text-center text-2xl uppercase"
      >
        Generate event
      </div>
      <Formik
        initialValues={{
          name: "",
          type: "FIRE",
          pointsToAdd: "",
        }}
        validationSchema={generateEventSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          if (isNaN(parseInt(values.pointsToAdd))) {
            setMessage({
              payload: "use only numbers for points",
              type: "error",
            });
            setIsLoading(false);
            return;
          }
          const res = await api.admin.generateEvent.query({
            name: values.name,
            pointsAdded: parseInt(values.pointsToAdd),
            qr: null,
            type: values.type,
          });
          setMessage({
            payload: res.message,
            type: res.success === true ? "success" : "error",
          });
          setIsLoading(false);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col space-y-2">
              <div>Select Type</div>
              <select
                value={values.type}
                className="px-2 py-2 "
                style={{
                  borderRadius: 12,
                }}
                onChange={(e) => {
                  setFieldValue("type", e.target.value);
                }}
              >
                {eventTypeOptions.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  );
                })}
              </select>
              <div>Points</div>
              <CustomInput
                name="pointsToAdd"
                type="number"
                placeholder="Points"
              />
              <div>Event Name</div>
              <CustomInput name="name" type="text" placeholder="Event Name" />

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
              <button
                disabled={isLoading}
                type="submit"
                style={{
                  backgroundColor: style.color.fireRed,
                }}
                className="flex items-center justify-center rounded-[32px] py-4 text-white"
              >
                {isLoading === true ? (
                  <SVGIcon
                    name="loader"
                    className="animate-spin"
                    color="white"
                    size={30}
                  />
                ) : (
                  "Generate Event"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenerateEventsTab;
