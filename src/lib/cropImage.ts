export const COVER_IMAGE_ASPECT_RATIO = 16 / 9;
export const COVER_IMAGE_WIDTH = 1600;
export const COVER_IMAGE_HEIGHT = Math.round(
  COVER_IMAGE_WIDTH / COVER_IMAGE_ASPECT_RATIO
);

/**
 * Center-crops an image file to the fixed cover-image aspect ratio and
 * resizes it to a fixed max width, so every cover image on the site is
 * cropped identically regardless of the source photo's shape.
 */
export async function cropImageToCoverRatio(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);

  const sourceRatio = bitmap.width / bitmap.height;
  let sx = 0;
  let sy = 0;
  let sWidth = bitmap.width;
  let sHeight = bitmap.height;

  if (sourceRatio > COVER_IMAGE_ASPECT_RATIO) {
    sWidth = bitmap.height * COVER_IMAGE_ASPECT_RATIO;
    sx = (bitmap.width - sWidth) / 2;
  } else {
    sHeight = bitmap.width / COVER_IMAGE_ASPECT_RATIO;
    sy = (bitmap.height - sHeight) / 2;
  }

  const canvas = document.createElement("canvas");
  canvas.width = COVER_IMAGE_WIDTH;
  canvas.height = COVER_IMAGE_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas is not supported in this browser.");
  }

  ctx.drawImage(
    bitmap,
    sx,
    sy,
    sWidth,
    sHeight,
    0,
    0,
    COVER_IMAGE_WIDTH,
    COVER_IMAGE_HEIGHT
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.85)
  );

  if (!blob) {
    throw new Error("Could not process the image.");
  }

  return new File([blob], "cover.jpg", { type: "image/jpeg" });
}
