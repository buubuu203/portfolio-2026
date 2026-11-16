"use client";

import Image from "next/image";
import { useState } from "react";

export function CvPreview() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex w-full items-center justify-center p-6 text-center text-[15px] text-[var(--text-secondary)]"
        style={{ aspectRatio: "1075/1521", background: "#f5f5f7" }}
        role="img"
        aria-label="CV preview unavailable"
      >
        CV preview unavailable. Open the PDF to view it.
      </div>
    );
  }

  return (
    <Image
      src="/images/cv-preview.png"
      alt="Preview of Chau Ngoc Buu Dang's CV, page 1"
      width={1075}
      height={1521}
      className="block h-auto w-full"
      style={{ aspectRatio: "1075/1521", objectFit: "cover", background: "#f5f5f7" }}
      onError={() => setFailed(true)}
    />
  );
}
