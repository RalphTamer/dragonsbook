"use client";
import { useState } from "react";
import { style } from "~/lib/styles";
import BottomSlideModal from "./UI/BottomSlideModal";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
const ScanQrPage = () => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="container">
      <div
        className="mx-12 my-12 text-center"
        style={{
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        Use your phone camera to scan the QR code and claim your points
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setModalIsVisible(true);
          }}
          className="mb-12 px-12 py-4"
          style={{
            backgroundColor: style.color.fireRed,
            color: "#fff",
            borderRadius: 16,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          GO TO CAMERA
        </button>
      </div>
      <div className=" grid grid-cols-2 gap-4">
        <div
          className="relative"
          style={{
            backgroundColor: "#000",
            aspectRatio: 1,
            borderRadius: 16,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 flex w-full items-center justify-center"
            style={{
              transform: "translate(-50%,-50%)",
            }}
          >
            <img
              src="/icons/fire-badge.png"
              style={{ maxWidth: "60px", width: "100%" }}
            ></img>
          </div>
        </div>
        <div
          className="relative"
          style={{
            backgroundColor: "#000",
            aspectRatio: 1,
            borderRadius: 16,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 flex w-full items-center justify-center"
            style={{
              transform: "translate(-50%,-50%)",
            }}
          >
            <img
              src="/icons/water-badge.png"
              style={{ maxWidth: "60px", width: "100%" }}
            ></img>
          </div>
        </div>
        <div
          className="relative"
          style={{
            backgroundColor: "#000",
            aspectRatio: 1,
            borderRadius: 16,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 flex w-full items-center justify-center"
            style={{
              transform: "translate(-50%,-50%)",
            }}
          >
            <img
              src="/icons/earth-badge.png"
              style={{ maxWidth: "60px", width: "100%" }}
            ></img>
          </div>
        </div>
        <div
          className="relative"
          style={{
            backgroundColor: "#000",
            aspectRatio: 1,
            borderRadius: 16,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 flex w-full items-center justify-center"
            style={{
              transform: "translate(-50%,-50%)",
            }}
          >
            <img
              src="/icons/wind-badge.png"
              style={{ maxWidth: "60px", width: "100%" }}
            ></img>
          </div>
        </div>
      </div>
      <BottomSlideModal
        height="90vh"
        isOpen={modalIsVisible}
        onClose={() => {
          setModalIsVisible(false);
        }}
      >
        <div className="container">
          <Scanner
            onScan={(detectedCodes) => {
              if (detectedCodes[0] == null) return;
              if (detectedCodes[0].rawValue.includes("redeem")) {
                setModalIsVisible(false);
                router.push(detectedCodes[0].rawValue);
              }
              console.log(detectedCodes);
            }}
          />
        </div>
      </BottomSlideModal>
    </div>
  );
};

export default ScanQrPage;
