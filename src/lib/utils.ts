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
  const blob = (await new Promise((resolve) =>
    canvas.toBlob(resolve, type, quality),
  )) as unknown as Blob;

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
export const SvgToImg = (args: {
  svgElementId: string;
  func: (file: File) => void;
}) => {
  const svgElement = document.getElementById(
    args.svgElementId,
  ) as SVGSVGElement | null;
  if (!svgElement) return;

  // Get the SVG content as a string
  const svgString = new XMLSerializer().serializeToString(svgElement);

  // Create a Blob from the SVG string
  const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  // Create an Image element
  const img = new Image();

  img.onload = async () => {
    // Create a Canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

    // Set canvas dimensions to match the SVG dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the SVG onto the Canvas
    ctx.drawImage(img, 0, 0);

    // Convert the Canvas content to a data URL (JPG format)
    const jpgDataUrl = canvas.toDataURL("image/jpeg");

    // Revoke the object URL after use
    URL.revokeObjectURL(url);

    // Convert the data URL to a Blob
    const byteString = atob(jpgDataUrl.split(",")[1]!);
    const mimeString = jpgDataUrl!.split(",")[0]!.split(":")[1]!.split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    const jpgBlob = new Blob([intArray], { type: mimeString });

    // Create a File from the Blob
    const file = new File([jpgBlob], "image.jpg", {
      type: mimeString,
    });
    args.func(file);
  };
  img.onerror = (error) => {
    console.error("Error loading image", error);
  };

  // Set the image source to the object URL
  img.src = url;
};

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}
