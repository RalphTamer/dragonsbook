import * as yup from "yup";

// 1> uppercase
// 1> lowercase
// 1> number || character

export const signupFormSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  username: yup
    .string()
    .min(3, "minimun 3 characters")
    .required("Required")
    .max(12, "maximum 12 characters"),
  fullname: yup.string().required("Required"),
  dateOfBirth: yup.date().required("Required"),
  phoneNumber: yup.number().min(8).required("required"),
  instagramHandle: yup.string(),
  address: yup.string(),
  password: yup.string().min(6).required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const loginFormSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(6).required("Required"),
});
export const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});
export const resetPasswordFormSchema = yup.object().shape({
  password: yup.string().min(6).required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const editProfileSchema = yup.object().shape({
  fullname: yup.string(),
  dateOfBirth: yup.date(),
  email: yup.string().email("Please enter a valid email"),
  phoneNumber: yup.number().min(8),
  instagramHandle: yup.string(),
  address: yup.string(),
});

export const addPopupSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  day: yup.number().required(),
  link: yup.string().url(),
  month: yup.string(),
});
export const addSpecialBadgeSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  year: yup.number().required(),
  image: yup.string().url(),
});
export const generateEventSchema = yup.object().shape({
  name: yup.string().required(),
  pointsToAdd: yup.number().required(),
  type: yup.mixed().oneOf(["FIRE", "WATER", "WIND", "EARTH"]).required(),
});
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().min(6).required("Required"),
  newPassword: yup.string().min(6).required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});
