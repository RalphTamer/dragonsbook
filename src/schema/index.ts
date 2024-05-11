import z from "zod";
import * as yup from "yup";

// 1> uppercase
// 1> lowercase
// 1> number || character
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const registerFormSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  username: yup.string().min(3, "minimun 3 characters").required("Required"),

  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const loginFormSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});
