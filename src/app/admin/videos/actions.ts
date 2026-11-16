"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function createHobbyVideo(formData: FormData) {
  await requireAdminSession();

  const url = String(formData.get("url") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim();
  const category = String(formData.get("category") ?? "piano").trim();
  const aspectRatio = String(formData.get("aspectRatio") ?? "3:4").trim();
  const duration = parseInt(String(formData.get("duration") ?? "30"), 10) || 30;

  if (!url) return;

  const maxOrder = await prisma.hobbyVideo.aggregate({ _max: { sortOrder: true } });
  const sortOrder = (maxOrder._max.sortOrder ?? -1) + 1;

  await prisma.hobbyVideo.create({ data: { url, caption, category, aspectRatio, duration, sortOrder } });
  revalidatePath("/");
  revalidatePath("/admin/videos");
}

export async function deleteHobbyVideo(id: string) {
  await requireAdminSession();
  await prisma.hobbyVideo.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/videos");
}
