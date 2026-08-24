import { prisma } from "@/lib/prisma";

export function estimateReadingTime(content: string) {
  const text = content.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
}

export function getPostBySlug(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export function getAllPostsForAdmin() {
  return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
}

export function getPostById(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
