import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VideoUploadForm } from "./VideoUploadForm";
import { deleteHobbyVideo } from "./actions";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminVideosPage() {
  try { await requireAdminSession(); } catch { redirect("/admin/login"); }
  const videos = await prisma.hobbyVideo.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hobby Videos</h1>
        <Link href="/admin" className="text-sm underline underline-offset-4">
          Back to posts
        </Link>
      </div>

      <VideoUploadForm />

      {videos.length === 0 ? (
        <p className="mt-8 text-foreground/60">No videos yet. Upload your first one above.</p>
      ) : (
        <>
          {(["piano", "3d-printing"] as const).map((cat) => {
            const catVideos = videos.filter((v) => v.category === cat);
            if (catVideos.length === 0) return null;
            return (
              <div key={cat} className="mt-8">
                <h2 className="mb-4 text-lg font-semibold">
                  {cat === "piano" ? "🎹 Piano" : "🧊 3D Printing"}
                </h2>
                <ul className="flex flex-col gap-4">
                  {catVideos.map((video) => (
                    <li
                      key={video.id}
                      className="flex items-start gap-4 rounded-lg border border-foreground/10 p-4"
                    >
                      <video
                        src={video.url}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-48 shrink-0 rounded-md"
                      />
                      <div className="flex flex-1 flex-col gap-2">
                        <p className="text-sm font-medium">
                          {video.caption || <span className="text-foreground/40">No caption</span>}
                        </p>
                        <p className="text-xs text-foreground/40">
                          {video.aspectRatio} · {video.duration}s
                        </p>
                        <p className="break-all text-xs text-foreground/40">{video.url}</p>
                        <form
                          action={async () => {
                            "use server";
                            await deleteHobbyVideo(video.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="mt-2 text-sm text-red-500 hover:text-red-400"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
