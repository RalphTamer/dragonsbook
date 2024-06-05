"use client";

import { Form, Formik } from "formik";
import CustomInput from "./UI/CustomInput";
import { signupFormSchema } from "~/schema";
import { api } from "~/trpc/react";
import Link from "next/link";
import { style } from "~/lib/styles";

const SignupForm = () => {
  return (
    <div className="container mx-auto  my-8 md:px-[140px]">
      <Formik
        initialValues={{
          fullname: "",
          dateOfBirth: "",
          username: "",
          email: "",
          phoneNumber: "",
          instagramHandle: "",
          address: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupFormSchema}
        onSubmit={async (values, actions) => {
          await api.auth.userSignup.mutate({
            email: values.email,
            password: values.password,
            username: values.username,
            dateOfBirth: new Date(values.dateOfBirth),
            fullname: values.fullname,
            phoneNumber: values.phoneNumber.toString(),
            address: values.address,
            instagramHandle: values.instagramHandle,
          });
          // //   TODO : handle errors
          actions.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col space-y-2">
              <CustomInput
                name="fullname"
                type="text"
                placeholder="Full Name"
              />
              <CustomInput
                name="dateOfBirth"
                type="date"
                placeholder="Date Of Birth"
              />
              {/* <input name="dateOfBirth" type="date" /> */}
              <CustomInput
                name="username"
                type="text"
                placeholder="Enter your username"
              />
              <CustomInput
                name="email"
                type="email"
                placeholder="Enter your Email"
              />
              <CustomInput
                name="phoneNumber"
                type="number"
                placeholder="Phone Number"
              />
              <CustomInput
                name="instagramHandle"
                type="text"
                placeholder="Instagram Handle (Optional)"
              />
              <CustomInput
                name="address"
                type="text"
                placeholder="Address (Optional)"
              />
              <CustomInput
                name="password"
                type="password"
                placeholder="Enter your Password"
              />
              <CustomInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm your Password"
              />

              <button
                disabled={isSubmitting}
                type="submit"
                style={{}}
                className="rounded-[32px] bg-red-600 py-4 text-white"
              >
                SIGN UP
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div
        className="mt-2 text-center"
        style={{
          fontWeight: 600,
        }}
      >
        Already have an account ?
        <span style={{ color: style.color.fireRed }}>
          <Link href={"/auth/login"}>Login</Link>
        </span>
      </div>
      <div
        className="mx-8 mt-4 text-center"
        style={{
          fontSize: 12,
          fontWeight: "bold",
          lineHeight: 1.2,
        }}
      >
        Cam 49 will keep your information private. Only your name and ID will be
        public.
      </div>
    </div>
  );
};

export default SignupForm;
