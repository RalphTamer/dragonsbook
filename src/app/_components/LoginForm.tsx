"use client";

import { Form, Formik } from "formik";
import CustomInput from "./UI/CustomInput";
import { loginFormSchema } from "~/schema";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="container mx-auto  px-[140px]">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginFormSchema}
        onSubmit={async (values, actions) => {
          // Todo : handle errors
          const signInData = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          if (signInData != null && signInData.ok === true) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col space-y-2">
              <CustomInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your Email"
              />
              <CustomInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your Password"
              />

              <button
                disabled={isSubmitting}
                type="submit"
                style={{}}
                className="rounded-xl bg-red-600 py-2 text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <button onClick={async () => await signOut()}>signout</button>
      <button
        onClick={async () => {
          signIn("credentials", {
            email: "ralf.tamer@gmail.com",
            password: "R123r123",
          });
        }}
      >
        quick sign in
      </button>
      {/* <div>{JSON.stringify(session)}</div> */}
    </div>
  );
};

export default LoginForm;
