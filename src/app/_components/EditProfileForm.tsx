"use client";
import { Form, Formik } from "formik";
import { editProfileSchema } from "~/schema";
import CustomInput from "./UI/CustomInput";
import { User } from "@prisma/client";
import { api } from "~/trpc/react";
import SVGIcon from "./UI/SVGIcon";
type Props = {
  userData: Omit<User, "password">;
  updateUserData: (user: Omit<User, "password">) => void;
};
const EditProfileForm = (props: Props) => {
  const { userData } = props;

  return (
    <div className="mb-2 mt-8">
      <Formik
        initialValues={{
          fullname: userData.fullname,
          dateOfBirth: userData.dateOfBirth,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          instagramHandle: userData.instagramHandle ?? "",
          address: userData.address ?? "",
        }}
        validationSchema={editProfileSchema}
        onSubmit={async (values) => {
          const res = await api.user.updateUserData.query({
            address: values.address,
            dateOfBirth: values.dateOfBirth,
            email: values.email,
            fullname: values.fullname,
            instagramHandle: values.instagramHandle,
            phoneNumber: values.phoneNumber,
          });
          if (res.success === true) {
            if (res.userData != null) {
              props.updateUserData(res.userData);
            }
          }
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
                name="DateOfBirth"
                type="date"
                placeholder="Date Of Birth"
              />
              <CustomInput name="email" type="email" placeholder="Email" />
              <CustomInput
                name="phoneNumber"
                type="string"
                placeholder="Phone Number"
              />
              <CustomInput
                name="instagramHandle"
                type="text"
                placeholder="Instagram Handle"
              />
              <CustomInput name="address" type="text" placeholder="Address" />
              {/* <CustomInput
                name="password"
                type="password"
                placeholder="Password"
              /> */}
              <button
                disabled={isSubmitting}
                type="submit"
                style={{}}
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
                    "Save"
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

export default EditProfileForm;
