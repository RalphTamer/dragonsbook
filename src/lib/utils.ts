import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";
import type { OurFileRouter } from "~/app/api/uploadthing/core";

export function humanize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function humanizePaths(path: string) {
  if (path.startsWith("/dragon-book")) {
    return "DRAGON BOOK";
  } else if (path.startsWith("/leaderboard")) {
    return "LEADERBOARD";
  } else if (path.startsWith("/scan-qr")) {
    return "SCAN QR";
  } else if (path.startsWith("/admin")) {
    return "ADMIN";
  } else if (path.startsWith("/redeem")) {
    return "POINTS CLAIMED";
  } else {
    return "ERROR";
  }
}

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export const compressImage = async (
  file: File,
  { quality = 1, type = file.type },
) => {
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

  // Draw to canvas
  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext("2d");
  if (ctx == null) return;
  ctx.drawImage(imageBitmap, 0, 0);

  // Turn into Blob
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob"));
        }
      },
      type,
      quality,
    );
  });

  const compressedFile = new File([blob], file.name, {
    type: file.type,
  });

  return compressedFile;
};
export const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}
