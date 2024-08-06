import React, { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import type { PixelCrop, Crop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
// import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import SVGIcon from "../SVGIcon";
import Image from "next/image";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
type Props = {
  buttonText: ReactNode;
  onButtonClick: (file: File) => Promise<void>;
  buttonBgColor: string;
  buttonColor: string;
  loading: (isLoading: boolean) => void;
  uploadButtonDisabled: boolean;
};
export default function ImageCropper(props: Props) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const scale = 1;
  const rotate = 0;
  const aspect = 1;

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0] != null) {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (file && validTypes.includes(file.type)) {
        setFileName(e.target.files[0].name);
        setCrop(undefined); // Makes crop preview update between images.
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          setImgSrc(reader.result?.toString() ?? ""),
        );
        if (e.target.files[0] == null) return;
        reader.readAsDataURL(e.target.files[0]);
      } else {
        alert("Please select a valid image file (JPEG, JPG, PNG).");
      }
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onButtonClick() {
    props.loading(true);

    const image = imgRef.current as HTMLImageElement;
    const previewCanvas = previewCanvasRef.current as HTMLCanvasElement;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Create a traditional canvas element
    const canvas = document.createElement("canvas");
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    // Convert traditional canvas to blob
    canvas.toBlob(async (blob) => {
      if (blob) {
        handleFile(blob);
      } else {
        throw new Error("Canvas to blob conversion failed");
      }
    }, "image/jpeg");

    async function handleFile(blob: Blob) {
      const date = new Date();
      const randomFileName = `file-name-${date.getDate()}-${date.getMonth() + 1}-${date.getHours()}--${date.getMilliseconds()}-${Math.ceil(date.getMilliseconds() * (Math.random() * 100000000000))}.jpg`;
      const file = new File([blob], randomFileName, {
        type: blob.type,
      });
      await props.onButtonClick(file);
      props.loading(false);
    }
  }

  // Use regular useEffect
  useEffect(() => {
    const handleAsync = async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    };

    // Call the asynchronous function directly
    handleAsync().catch((error) => {
      // Handle errors here if necessary
      console.error("Error occurred:", error);
    });
  }, [completedCrop, scale, rotate]);
  return (
    <div className="App space-y-2">
      <div className="Crop-Controls">
        <div
          style={{
            backgroundColor: props.buttonBgColor,
            color: props.buttonColor,
            borderRadius: 14,
          }}
          className="py-2 text-center"
          onClick={() => {
            if (inputFileRef.current == null) return;
            inputFileRef.current.click();
          }}
        >
          {fileName ?? "Select Image"}
        </div>
        <input
          className="hidden"
          ref={inputFileRef}
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={onSelectFile}
        />
      </div>
      {imgSrc != null ? (
        <div className="flex justify-center">
          <ReactCrop
            style={{
              maxHeight: "100%",
              width: "50vw",
            }}
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            // minWidth={400}
            minHeight={100}
            // circularCrop
          >
            <Image
              ref={imgRef}
              src={imgSrc}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              priority
              style={{
                height: "100%",
                width: "100%",
                transform: `scale(${scale}) rotate(${rotate}deg)`,
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
      ) : (
        <div className="flex justify-center">
          {fileName != null && (
            <SVGIcon name="loader" className="animate-spin" size={32}></SVGIcon>
          )}
        </div>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div className="flex justify-center">
            <button
              disabled={props.uploadButtonDisabled}
              className="px-4 py-2"
              style={{
                backgroundColor: props.buttonBgColor,
                color: props.buttonColor,
                borderRadius: 14,
              }}
              onClick={onButtonClick}
            >
              {props.buttonText}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
