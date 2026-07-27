import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageElement, ogImageSize } from "@/lib/og-image";

export const alt = "Blog — Chau Ngoc Buu Dang";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return new ImageResponse(ogImageElement({ eyebrow: "Blog", title: "Coming soon." }), size);
}
