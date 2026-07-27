import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageElement, ogImageSize } from "@/lib/og-image";

export const alt = "Fit Check — Chau Ngoc Buu Dang";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return new ImageResponse(
    ogImageElement({ eyebrow: "AI Fit Check", title: "Is this role a fit?" }),
    size
  );
}
