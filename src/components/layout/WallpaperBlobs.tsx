"use client";

import { useReducedMotion } from "framer-motion";

const blobs = [
  { color: "#a6a6b0", width: 520, height: 520, top: -120, left: -140, dx: "90px", dy: "60px", dur: "24s" },
  { color: "#ffffff", width: 480, height: 480, top: 380, right: -160, dx: "-80px", dy: "70px", dur: "30s" },
  { color: "#a8a8b2", width: 520, height: 520, top: 1500, left: -200, dx: "70px", dy: "-60px", dur: "27s" },
  { color: "#ffffff", width: 460, height: 460, top: 2500, right: -140, dx: "-70px", dy: "-50px", dur: "33s" },
];

export function WallpaperBlobs() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="par" aria-hidden>
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="blob"
          style={{
            background: blob.color,
            width: blob.width,
            height: blob.height,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            "--dx": blob.dx,
            "--dy": blob.dy,
            "--dur": blob.dur,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
