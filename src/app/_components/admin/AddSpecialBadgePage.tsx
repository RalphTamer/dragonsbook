"use client";
import imageCompression from "browser-image-compression";
import { Formik, Form } from "formik";
import { useState } from "react";
import BottomSlideModal from "~/app/_components/UI/BottomSlideModal";
import CustomInput from "~/app/_components/UI/CustomInput";
import ImageCropper from "~/app/_components/UI/ImageCropper/ImageCropper";
import SVGIcon from "~/app/_components/UI/SVGIcon";
import { style } from "~/lib/styles";
import { useUploadThing } from "~/lib/utils";
import { addSpecialBadgeSchema } from "~/schema";
import { api } from "~/trpc/react";

const AddSpecialBadgePage = () => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    payload: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { startUpload } = useUploadThing("imageUploader", {});

  return (
    <div className="container">
      <div
        style={{
          fontWeight: "bold",
        }}
        className=" my-2 text-center text-2xl uppercase"
      >
        Add Special Badge
      </div>
      <Formik
        initialValues={{
          title: "",
          content: "",
          year: "",
          image: "",
        }}
        validationSchema={addSpecialBadgeSchema}
        onSubmit={async (values) => {
          if (isNaN(parseInt(values.year))) {
            setMessage({
              payload: "use only numbers for year",
              type: "error",
            });
            return;
          } else if (values.image === "") {
            setMessage({
              payload: "please upload an image",
              type: "error",
            });
            return;
          }

          const res = await api.admin.AddSpecialBadge.query({
            content: values.content,
            image: values.image,
            title: values.title,
            year: parseInt(values.year),
          });
          if (res.success === true) {
            setMessage({
              payload: res.message,
              type: "success",
            });
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col space-y-2">
              <div>title</div>
              <CustomInput name="title" type="text" placeholder="title" />
              <div>content</div>
              <CustomInput name="content" type="text" placeholder="content" />
              <div>year</div>
              <CustomInput name="year" type="number" placeholder="year" />
              <div
                onClick={() => {
                  setModalOpen(true);
                }}
                className="px-4 py-2 "
                style={{
                  borderRadius: 18,
                  backgroundColor: style.color.fireRed,
                  color: "white",
                  textAlign: "center",
                }}
              >
                {values.image != "" ? "Image Selected" : "Upload Image"}
              </div>

              <BottomSlideModal
                isOpen={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                }}
                height="90vh"
              >
                <div className="container my-2">
                  <ImageCropper
                    loading={(value) => {
                      setIsUploading(value);
                    }}
                    uploadButtonDisabled={isUploading}
                    buttonBgColor={style.color.fireRed}
                    buttonColor={"white"}
                    onButtonClick={async (file) => {
                      if (isUploading === true) return;
                      const compressedFile = await imageCompression(file, {
                        maxWidthOrHeight: 300,
                      });
                      const res = await startUpload([compressedFile]);
                      if (res == null || res[0] == null) {
                        return;
                      }
                      setFieldValue("image", res[0].url);
                      setModalOpen(false);
                    }}
                    buttonText={
                      isUploading === true ? (
                        <SVGIcon
                          name="loader"
                          className="animate-spin"
                          color="#fff"
                        />
                      ) : (
                        <>Select Image</>
                      )
                    }
                  />
                </div>
              </BottomSlideModal>
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
                className="flex items-center justify-center rounded-[32px] py-4 text-white"
              >
                {isSubmitting === true ? (
                  <SVGIcon
                    name="loader"
                    className="animate-spin"
                    color="white"
                    size={30}
                  />
                ) : (
                  "Add Special Badge"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSpecialBadgePage;
