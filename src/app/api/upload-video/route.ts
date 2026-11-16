import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isValidAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request): Promise<NextResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSessionToken(token)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"],
        maximumSizeInBytes: 50 * 1024 * 1024,
        tokenPayload: JSON.stringify({ admin: true }),
      }),
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
