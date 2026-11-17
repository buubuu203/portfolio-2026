"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const action = searchParams.get("action");

  if (action === "list") {
    const videos = await prisma.hobbyVideo.findMany();
    return NextResponse.json(
      videos.map((v) => ({ id: v.id, caption: v.caption, url: v.url })),
    );
  }

  if (action === "update") {
    const id = searchParams.get("id");
    const url = searchParams.get("url");
    if (!id || !url) {
      return NextResponse.json({ error: "missing id or url" }, { status: 400 });
    }
    await prisma.hobbyVideo.update({ where: { id }, data: { url } });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
