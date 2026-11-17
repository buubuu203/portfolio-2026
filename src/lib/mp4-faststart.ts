/**
 * Client-side MP4 faststart: relocate moov atom before mdat for streaming playback.
 * Without this, browsers may need to download the entire file before playing.
 */

interface Box {
  type: string;
  offset: number;
  size: number;
}

function parseTopLevelBoxes(view: DataView, length: number): Box[] {
  const boxes: Box[] = [];
  let pos = 0;
  while (pos < length - 8) {
    const size = view.getUint32(pos);
    const type = String.fromCharCode(
      view.getUint8(pos + 4),
      view.getUint8(pos + 5),
      view.getUint8(pos + 6),
      view.getUint8(pos + 7),
    );
    if (size < 8 || pos + size > length) break;
    boxes.push({ type, offset: pos, size });
    pos += size;
  }
  return boxes;
}

function adjustOffsets(moovBytes: Uint8Array, delta: number) {
  const view = new DataView(moovBytes.buffer, moovBytes.byteOffset, moovBytes.byteLength);

  function walk(start: number, end: number) {
    let pos = start;
    while (pos < end - 8) {
      const size = view.getUint32(pos);
      const type = String.fromCharCode(
        view.getUint8(pos + 4),
        view.getUint8(pos + 5),
        view.getUint8(pos + 6),
        view.getUint8(pos + 7),
      );
      if (size < 8 || pos + size > end) break;

      if (type === "stco") {
        const version = view.getUint8(pos + 8);
        const entryCount = view.getUint32(pos + 12);
        for (let i = 0; i < entryCount; i++) {
          const off = pos + 16 + i * 4;
          if (off + 4 <= pos + size) {
            view.setUint32(off, view.getUint32(off) + delta);
          }
        }
      } else if (type === "co64") {
        const entryCount = view.getUint32(pos + 12);
        for (let i = 0; i < entryCount; i++) {
          const off = pos + 16 + i * 8;
          if (off + 8 <= pos + size) {
            const hi = view.getUint32(off);
            const lo = view.getUint32(off + 4);
            const val = hi * 0x100000000 + lo + delta;
            view.setUint32(off, Math.floor(val / 0x100000000));
            view.setUint32(off + 4, val >>> 0);
          }
        }
      } else if (
        type === "moov" ||
        type === "trak" ||
        type === "mdia" ||
        type === "minf" ||
        type === "stbl"
      ) {
        walk(pos + 8, pos + size);
      }

      pos += size;
    }
  }

  walk(0, moovBytes.byteLength);
}

export async function mp4Faststart(file: File): Promise<File> {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);
  const boxes = parseTopLevelBoxes(view, buffer.byteLength);

  const moov = boxes.find((b) => b.type === "moov");
  const mdat = boxes.find((b) => b.type === "mdat");

  if (!moov || !mdat) return file;
  if (moov.offset < mdat.offset) return file;

  const beforeMdat = new Uint8Array(buffer, 0, mdat.offset);
  const moovData = new Uint8Array(buffer.slice(moov.offset, moov.offset + moov.size));

  adjustOffsets(moovData, moov.size);

  const mdatAndMiddle = new Uint8Array(buffer, mdat.offset, moov.offset - mdat.offset);

  const afterMoov =
    moov.offset + moov.size < buffer.byteLength
      ? new Uint8Array(buffer, moov.offset + moov.size)
      : new Uint8Array(0);

  const result = new Blob([beforeMdat, moovData, mdatAndMiddle, afterMoov], {
    type: file.type || "video/mp4",
  });

  return new File([result], file.name, { type: file.type || "video/mp4" });
}
