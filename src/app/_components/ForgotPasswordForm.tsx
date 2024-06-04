"use client";
import { Formik, Form } from "formik";
import { useState } from "react";
import CustomInput from "~/app/_components/UI/CustomInput";
import SVGIcon from "~/app/_components/UI/SVGIcon";
import { style } from "~/lib/styles";
import { forgotPasswordFormSchema } from "~/schema";
import { api } from "~/trpc/react";

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState<{
    type: "error" | "success";
    payload: string;
  } | null>(null);

  return (
    <div className="container">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordFormSchema}
        onSubmit={async (values) => {
          const res = await api.auth.forgotPasswordSendEmail.query({
            email: values.email,
            token: Math.floor(Math.random() * 100000000000000),
          });
          if (res.ok === false) {
            setMessage({
              type: "error",
              payload: res.message,
            });
          } else {
            setMessage({
              type: "success",
              payload: res.message,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col space-y-2">
              <CustomInput
                name="email"
                type="email"
                placeholder="Enter your Email"
              />
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
                  "RESET PASSWORD"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
