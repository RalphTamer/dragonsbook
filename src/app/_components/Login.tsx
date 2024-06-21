"use client";

import { Form, Formik } from "formik";
import CustomInput from "./UI/CustomInput";
import { forgotPasswordFormSchema } from "~/schema";
import { signIn } from "next-auth/react";
import { style } from "~/lib/styles";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import SVGIcon from "./UI/SVGIcon";
import AsyncButton from "./UI/AsyncButton";
import { api } from "~/trpc/react";

const LoginForm = () => {
  const [submitErrors, setSubmitErrors] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  return (
    <div className="container ">
      <div
        className="relative my-8"
        style={{
          borderRadius: 18,
          width: "100%",
          height: "100%",
          aspectRatio: 1,
        }}
      >
        <Image
          className="absolute left-1/2 top-1/2"
          src={"/images/login-photo.png"}
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 18,
            transform: "translate(-50%,-50%)",
          }}
        />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={forgotPasswordFormSchema}
        onSubmit={async (values) => {
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          }).then(async (data) => {
            if (data?.ok === true) {
              setSubmitErrors(null);
              await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: "/dragon-book",
              });
            } else {
              if (data?.error != null) {
                setSubmitErrors(data?.error);
              }
            }
          });
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="flex flex-col space-y-1">
              <CustomInput name="email" type="email" placeholder="Email" />
              <CustomInput
                name="password"
                type="password"
                placeholder="Password"
              />
              {submitErrors != null && (
                <div
                  className="text-center"
                  style={{
                    fontWeight: 500,
                    color: style.color.fireRed,
                  }}
                >
                  {submitErrors}
                  {submitErrors.includes("not verified") && (
                    <>
                      <AsyncButton
                        buttonText="Send mail"
                        style={{
                          borderRadius: 12,
                          background: style.color.fireRed,
                        }}
                        onClick={async () => {
                          const res =
                            await api.auth.sendVerificationEmail.query({
                              email: values.email,
                            });
                          setMessage(res);
                        }}
                      />
                      {message != null && (
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: 14,
                            color:
                              message.success === true
                                ? style.color.earthGreen
                                : style.color.fireRed,
                          }}
                        >
                          {message.message}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="mt-8">
              <button
                disabled={isSubmitting}
                type="submit"
                style={{
                  backgroundColor: style.color.fireRed,
                }}
                className="my-1 flex w-full items-center justify-center rounded-[32px] py-4 text-white"
              >
                {isSubmitting === true ? (
                  <SVGIcon
                    name="loader"
                    className="animate-spin"
                    color="white"
                    size={28}
                  />
                ) : (
                  "LOGIN"
                )}
              </button>
              <Link
                style={{
                  backgroundColor: style.color.waterBlue,
                }}
                className="my-1 flex w-full items-center justify-center rounded-[32px] py-4 text-white"
                href={"/auth/signup"}
              >
                SIGN UP
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      <div
        className="text-center"
        style={{
          fontWeight: 600,
        }}
      >
        Forgot your password ?{" "}
        <span style={{ color: style.color.fireRed }}>
          <Link href={"/auth/forgot-password"}>click here</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
