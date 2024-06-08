"use client";

import { Formik, Form } from "formik";
import { useState } from "react";
import CustomInput from "~/app/_components/UI/CustomInput";
import SVGIcon from "~/app/_components/UI/SVGIcon";
import { style } from "~/lib/styles";
import { addPopupSchema } from "~/schema";
import { api } from "~/trpc/react";

const PopupPage = () => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    payload: string;
  } | null>(null);
  return (
    <div className="container">
      <div
        style={{
          fontWeight: "bold",
        }}
        className=" my-2 text-center text-2xl uppercase"
      >
        Add Popup
      </div>
      <Formik
        initialValues={{
          title: "",
          content: "",
          day: "",
          link: "",
          month: "",
        }}
        validationSchema={addPopupSchema}
        onSubmit={async (values) => {
          const res = await api.admin.AddPopup.query({
            content: values.content,
            day:
              typeof values.day === "string"
                ? parseInt(values.day)
                : typeof values.day === "number"
                  ? values.day
                  : 23,
            link: values.link,
            month: values.month,
            title: values.title,
          });
          setMessage({
            payload: res.message,
            type: res.success === true ? "success" : "error",
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col space-y-2">
              <div>day</div>
              <CustomInput name="day" type="number" placeholder="day" />
              <div>month</div>
              <CustomInput name="month" type="text" placeholder="month" />
              <div>title</div>
              <CustomInput name="title" type="text" placeholder="title" />
              <div>content</div>
              <CustomInput name="content" type="text" placeholder="content" />
              <div>link</div>
              <CustomInput name="link" type="text" placeholder="link" />
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
                disabled={isSubmitting}
                type="submit"
                style={{
                  backgroundColor: style.color.fireRed,
                }}
                className="flex items-center justify-center rounded-[32px] py-4 text-white"
              >
                {isSubmitting === true ? (
                  <SVGIcon
                    name="loader"
                    className="animate-spin"
                    color="white"
                    size={30}
                  />
                ) : (
                  "Add Popup"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PopupPage;
