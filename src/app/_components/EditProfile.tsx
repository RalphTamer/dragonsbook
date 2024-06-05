"use client";
import imageCompression from "browser-image-compression";
import type { User } from "@prisma/client";
import { style } from "~/lib/styles";
import type { UserRank } from "~/lib/types";
import EditProfileForm from "./EditProfileForm";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useUploadThing } from "~/lib/utils";
import SVGIcon from "./UI/SVGIcon";
import BottomSlideModal from "./UI/BottomSlideModal";
import ImageCropper from "./UI/ImageCropper/ImageCropper";
// import ImageCropper from "./UI/ImageCropper";

type Props = {
  userData: Omit<User, "password">;
  userRank: UserRank;
  onCancelButtonClick: VoidFunction;
  updateUserData: (user: Omit<User, "password">) => void;
};

const EditProfile = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { startUpload } = useUploadThing("imageUploader");

  const { userData, userRank } = props;
  const [userImage, setUserImage] = useState<string | null>(
    props.userData.image,
  );
  return (
    <div className="container ">
      <div
        className="relative flex w-full gap-2 py-8"
        style={{
          borderBottom: "1px solid #ccc",
        }}
      >
        <div className="flex w-[70%] flex-col justify-between">
          <div style={{ lineHeight: 1 }}>
            <div className="text-[18px] font-bold">{userData.title}</div>
            <div
              style={{
                color: style.color.fireRed,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              rank:#{userRank.rankByTotalPoints}
            </div>
          </div>
          <div
            className="flex gap-4"
            style={{
              fontSize: 12,
            }}
          >
            <div>
              <div>Username:</div>
              <div>Total Pts:</div>
            </div>
            <div>
              <div>{userData.username}</div>
              <div>{userData.totalPoints}</div>
            </div>
          </div>
        </div>
        <div
          className="w-[30%]"
          style={{
            maxWidth: 80,
            maxHeight: 80,
            position: "relative",
          }}
        >
          <img
            src={userImage ?? "/images/character.jpg"}
            style={{
              borderRadius: 12,
              aspectRatio: 1,
            }}
          ></img>
          <div
            onClick={() => {
              setModalOpen(true);
            }}
            className="absolute bottom-[-5px] right-[-5px] bg-white p-1"
            style={{
              borderRadius: "50%",
              border: "1px solid #000",
            }}
          >
            <SVGIcon name="pencil" size={16} />
          </div>
        </div>
      </div>
      <EditProfileForm
        userData={userData}
        updateUserData={props.updateUserData}
      />
      <div
        className="flex  justify-center rounded-[32px] py-4 text-white"
        style={{
          background: "#737373",
        }}
        onClick={() => {
          props.onCancelButtonClick();
        }}
      >
        CANCEL
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
              console.log(res);

              if (res?.[0] == null) {
                return;
              }
              await api.user.changeProfilePicture.query({
                image: res[0].url,
              });
              setUserImage(res[0].url);
              setModalOpen(false);
            }}
            buttonText={
              isUploading === true ? (
                <SVGIcon name="loader" className="animate-spin" color="#fff" />
              ) : (
                <>Update Picture</>
              )
            }
          />
        </div>
      </BottomSlideModal>
    </div>
  );
};

export default EditProfile;
