"use client";

import { useState } from "react";
import { updateHobbyVideo, deleteHobbyVideo } from "./actions";

type Video = {
  id: string;
  url: string;
  caption: string | null;
  category: string;
  aspectRatio: string | null;
  duration: number | null;
  sortOrder: number;
};

export function VideoEditCard({ video }: { video: Video }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!editing) {
    return (
      <li className="flex items-start gap-4 rounded-lg border border-foreground/10 p-4">
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
            {video.category} · {video.aspectRatio} · {video.duration}s · order: {video.sortOrder}
          </p>
          <p className="break-all text-xs text-foreground/40">{video.url}</p>
          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              Edit
            </button>
            <form
              action={async () => {
                if (!confirm("Delete this video?")) return;
                await deleteHobbyVideo(video.id);
              }}
            >
              <button type="submit" className="text-sm text-red-500 hover:text-red-400">
                Delete
              </button>
            </form>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="rounded-lg border-2 border-blue-500/30 bg-blue-500/5 p-4">
      <form
        action={async (formData: FormData) => {
          setSaving(true);
          await updateHobbyVideo(video.id, formData);
          setSaving(false);
          setEditing(false);
        }}
      >
        <div className="flex items-start gap-4">
          <video
            src={video.url}
            controls
            preload="metadata"
            playsInline
            className="w-48 shrink-0 rounded-md"
          />
          <div className="flex flex-1 flex-col gap-3">
            <label className="flex flex-col gap-1 text-xs font-medium text-foreground/60">
              URL
              <input
                name="url"
                defaultValue={video.url}
                className="rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-foreground/60">
              Caption
              <input
                name="caption"
                defaultValue={video.caption ?? ""}
                className="rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm"
              />
            </label>
            <div className="flex gap-3">
              <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-foreground/60">
                Category
                <select
                  name="category"
                  defaultValue={video.category}
                  className="rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm"
                >
                  <option value="piano">Piano</option>
                  <option value="3d-printing">3D Printing</option>
                </select>
              </label>
              <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-foreground/60">
                Aspect Ratio
                <select
                  name="aspectRatio"
                  defaultValue={video.aspectRatio ?? "3:4"}
                  className="rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm"
                >
                  <option value="3:4">3:4 (Portrait)</option>
                  <option value="16:9">16:9 (Landscape)</option>
                </select>
              </label>
            </div>
            <div className="flex gap-3">
              <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-foreground/60">
                Duration (s)
                <input
                  name="duration"
                  type="number"
                  defaultValue={video.duration ?? 30}
                  className="rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-foreground/60">
                Sort Order
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={video.sortOrder}
                  className="rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm"
                />
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg border border-foreground/10 px-4 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </li>
  );
}
