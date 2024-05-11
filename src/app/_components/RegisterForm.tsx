"use client";

import { Form, Formik, useFormik } from "formik";
import CustomInput from "./UI/CustomInput";
import { registerFormSchema } from "~/schema";
import { api } from "~/trpc/react";

const RegisterForm = () => {
  const { mutate } = api.auth.registerUser.useMutation();
  return (
    <div className="container mx-auto  px-[140px]">
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerFormSchema}
        onSubmit={async (values, actions) => {
          mutate({
            email: values.email,
            password: values.password,
            username: values.username,
          });
          //   TODO : handle errors
          actions.resetForm();
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
                label="Username"
                name="username"
                type="username"
                placeholder="Enter your username"
              />
              <CustomInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your Password"
              />
              <CustomInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your Password"
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
    </div>
  );
};

export default RegisterForm;
