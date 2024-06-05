"use client";

import { Form, Formik } from "formik";
import CustomInput from "./UI/CustomInput";
import { forgotPasswordFormSchema } from "~/schema";
import { signIn } from "next-auth/react";
import { style } from "~/lib/styles";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const LoginForm = () => {
  const [submitErrors, setSubmitErrors] = useState<boolean>(false);

  return (
    <div className="container ">
      <div
        className="my-8"
        style={{
          borderRadius: 18,
        }}
      >
        <Image
          src={"/images/login-photo.png"}
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{ width: "100%", height: "100%", borderRadius: 18 }}
        />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={forgotPasswordFormSchema}
        onSubmit={async (values) => {
          // Todo : handle errors

          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          }).then(async (data) => {
            if (data?.ok === true) {
              setSubmitErrors(false);
              await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: "/dragon-book",
              });
            } else {
              setSubmitErrors(true);
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col space-y-1">
              <CustomInput name="email" type="email" placeholder="Email" />
              <CustomInput
                name="password"
                type="password"
                placeholder="Password"
              />
              {submitErrors === true && (
                <div
                  className="text-center"
                  style={{
                    fontWeight: 500,
                    color: style.color.fireRed,
                  }}
                >
                  Email or Password are incorrect
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
                LOGIN
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

      <button
        onClick={async () => {
          await signIn("credentials", {
            email: "ralf.tamer@gmail.com",
            password: "R123r123",
          });
        }}
      >
        quick sign in
      </button>
      <button
        onClick={async () => {
          await signIn("credentials", {
            email: "ralf.tamer1@gmail.com",
            password: "R123r123",
          });
        }}
      >
        quick sign in admin
      </button>
      {/* <div>{JSON.stringify(session)}</div> */}
    </div>
  );
};

export default LoginForm;
