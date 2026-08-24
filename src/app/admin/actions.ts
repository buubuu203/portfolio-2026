"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  isCorrectAdminPassword,
  requireAdminSession,
} from "@/lib/auth";
import { slugify } from "@/lib/posts";

export type UploadImageState = { url?: string; error?: string };

export async function uploadCoverImage(
  formData: FormData
): Promise<UploadImageState> {
  await requireAdminSession();

  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image file first." };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "That file isn't an image." };
  }

  if (file.size > 8 * 1024 * 1024) {
    return { error: "Image is too large (max 8MB)." };
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").slice(-100);
    const blob = await put(`covers/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { url: blob.url };
  } catch {
    return {
      error:
        "Upload failed. Make sure BLOB_READ_WRITE_TOKEN is set (see setup guide).",
    };
  }
}

export type LoginState = { error?: string } | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Enter your admin password." };
  }

  if (!isCorrectAdminPassword(password)) {
    return { error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export type PostFormState = { error?: string } | undefined;

function readPostFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const published = formData.get("published") === "on";
  const slugInput = String(formData.get("slug") ?? "").trim();
  const coverImageInput = String(formData.get("coverImage") ?? "").trim();
  const coverImage = coverImageInput.length > 0 ? coverImageInput : null;

  return { title, excerpt, content, tags, published, slugInput, coverImage };
}

export async function createPost(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdminSession();

  const { title, excerpt, content, tags, published, slugInput, coverImage } =
    readPostFields(formData);

  if (!title || !excerpt || !content) {
    return { error: "Title, excerpt, and content are required." };
  }

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { error: "Could not generate a valid slug from that title." };
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return { error: `A post with slug "${slug}" already exists.` };
  }

  await prisma.post.create({
    data: { title, excerpt, content, tags, published, slug, coverImage },
  });

  revalidatePath("/blog");
  redirect("/admin");
}

export async function updatePost(
  id: string,
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdminSession();

  const { title, excerpt, content, tags, published, slugInput, coverImage } =
    readPostFields(formData);

  if (!title || !excerpt || !content) {
    return { error: "Title, excerpt, and content are required." };
  }

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { error: "Could not generate a valid slug from that title." };
  }

  const conflict = await prisma.post.findFirst({
    where: { slug, NOT: { id } },
  });
  if (conflict) {
    return { error: `A different post already uses slug "${slug}".` };
  }

  await prisma.post.update({
    where: { id },
    data: { title, excerpt, content, tags, published, slug, coverImage },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin");
}

export async function deletePost(id: string) {
  await requireAdminSession();

  const post = await prisma.post.findUnique({ where: { id } });
  await prisma.post.delete({ where: { id } });
  revalidatePath("/blog");
  if (post) {
    revalidatePath(`/blog/${post.slug}`);
  }
  redirect("/admin");
}
