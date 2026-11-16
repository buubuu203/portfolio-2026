"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { createHobbyVideo } from "./actions";

export function VideoUploadForm() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Choose a video file first.");
      return;
    }

    if (!file.type.startsWith("video/")) {
      setError("That file isn't a video.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("Video is too large (max 50 MB).");
      return;
    }

    setUploading(true);
    setError("");
    setProgress(0);

    try {
      const blob = await upload(
        `videos/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/upload-video",
          onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
        }
      );
      setUploadedUrl(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(formData: FormData) {
    await createHobbyVideo(formData);
    setUploadedUrl("");
    setError("");
    setProgress(0);
    formRef.current?.reset();
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="rounded-lg border border-foreground/10 p-6">
      <h2 className="mb-4 text-lg font-medium">Upload a video</h2>

      {!uploadedUrl ? (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-foreground/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-foreground/20"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {uploading && (
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full rounded-full bg-foreground transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-foreground/50">{progress}%</p>
            </div>
          )}
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      ) : (
        <form ref={formRef} action={handleSave}>
          <input type="hidden" name="url" value={uploadedUrl} />
          <video
            src={uploadedUrl}
            controls
            preload="metadata"
            playsInline
            className="mb-4 max-h-48 rounded-md"
          />
          <div className="flex flex-col gap-3">
            <select
              name="category"
              className="rounded-lg border border-foreground/10 bg-transparent px-4 py-2 text-sm"
            >
              <option value="piano">Piano</option>
              <option value="3d-printing">3D Printing</option>
            </select>
            <input
              type="text"
              name="caption"
              placeholder="Caption (optional)"
              className="w-full rounded-lg border border-foreground/10 bg-transparent px-4 py-2 text-sm"
            />
            <div className="flex gap-3">
              <select
                name="aspectRatio"
                className="rounded-lg border border-foreground/10 bg-transparent px-4 py-2 text-sm"
              >
                <option value="3:4">3:4 (Portrait)</option>
                <option value="16:9">16:9 (Landscape)</option>
              </select>
              <input
                type="number"
                name="duration"
                placeholder="Duration (seconds)"
                className="w-32 rounded-lg border border-foreground/10 bg-transparent px-4 py-2 text-sm"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
            >
              Save video
            </button>
            <button
              type="button"
              onClick={() => { setUploadedUrl(""); setError(""); }}
              className="rounded-lg border border-foreground/10 px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
