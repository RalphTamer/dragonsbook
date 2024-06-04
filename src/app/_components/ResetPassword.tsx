"use client";

import { Formik, Form } from "formik";
import { editProfileSchema } from "~/schema";
import { api } from "~/trpc/react";
import CustomInput from "./UI/CustomInput";
import { style } from "~/lib/styles";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SVGIcon from "./UI/SVGIcon";

type Props = {
  token: string;
};
const ResetPassword = (props: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState<{
    type: "error" | "success";
    payload: string;
  } | null>(null);
  return (
    <div className="container">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={editProfileSchema}
        onSubmit={async (values) => {
          await api.auth.resetPassword
            .query({
              password: values.password,
              token: props.token,
            })
            .then((res) => {
              if (res.ok === true) {
                setMessage({
                  payload: "Password reset success",
                  type: "success",
                });
              }
            })
            .then(async () => {
              await new Promise((resolve) => setTimeout(resolve, 2000));
              router.replace("/auth/login");
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col space-y-2">
              <CustomInput
                name="password"
                type="password"
                placeholder="New Password"
              />
              <CustomInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm New Password"
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
                className="rounded-[32px] py-4 text-white"
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

export default ResetPassword;
