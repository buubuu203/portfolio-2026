import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageElement, ogImageSize } from "@/lib/og-image";

export const alt = "Contact — Chau Ngoc Buu Dang";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return new ImageResponse(ogImageElement({ eyebrow: "Contact", title: "Let's talk." }), size);
}
