import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { ogImageContentType, ogImageElement, ogImageSize } from "@/lib/og-image";

export const alt = "Chau Ngoc Buu Dang";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const dynamic = "force-dynamic";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return new ImageResponse(
    ogImageElement({ eyebrow: post?.tags[0] ?? "Blog", title: post?.title ?? "Blog" }),
    size
  );
}
