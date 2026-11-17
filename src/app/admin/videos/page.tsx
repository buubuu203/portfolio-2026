import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VideoUploadForm } from "./VideoUploadForm";
import { VideoEditCard } from "./VideoEditCard";
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
                    <VideoEditCard key={video.id} video={video} />
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
