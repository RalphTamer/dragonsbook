"use client";
import { Formik, Form } from "formik";
import { changePasswordSchema } from "~/schema";
import { api } from "~/trpc/react";
import CustomInput from "../_components/UI/CustomInput";
import SVGIcon from "../_components/UI/SVGIcon";
import { useState } from "react";
import { style } from "~/lib/styles";

const UpdatePasswordPage = () => {
  const [message, setMessage] = useState<{
    type: "error" | "success";
    payload: string;
  } | null>(null);
  return (
    <div className="container mb-4 mt-12">
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordSchema}
        onSubmit={async (values, actions) => {
          const res = await api.auth.changePassword.query({
            confirmPassword: values.confirmPassword,
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
          });
          setMessage({
            payload: res.message,
            type: res.success === true ? "success" : "error",
          });
          if (res.success === true) {
            actions.resetForm();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col space-y-2">
              <CustomInput
                name="oldPassword"
                type="password"
                placeholder="Old Password"
              />
              <CustomInput
                name="newPassword"
                type="password"
                placeholder="New Password"
              />
              <CustomInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
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
                className="rounded-[32px] bg-red-600 py-4 text-white"
              >
                <div className="flex justify-center">
                  {isSubmitting === true ? (
                    <SVGIcon
                      name="loader"
                      color="white"
                      className="animate-spin"
                    />
                  ) : (
                    "Change Password"
                  )}
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePasswordPage;
