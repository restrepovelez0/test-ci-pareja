// Fotos: Vercel Blob en producción (necesita BLOB_READ_WRITE_TOKEN).
// En desarrollo local, sin token, las fotos se guardan en memoria y se sirven desde /api/upload?f=…
import { put, del } from "@vercel/blob";

export const blobReady = !!process.env.BLOB_READ_WRITE_TOKEN;

export async function saveImage(buffer, contentType) {
  const EXT = { "image/png": "png", "image/webp": "webp", "image/jpeg": "jpg", "audio/webm": "webm", "audio/mp4": "m4a", "audio/x-m4a": "m4a", "audio/m4a": "m4a", "audio/mpeg": "mp3", "audio/ogg": "ogg", "audio/aac": "aac", "audio/wav": "wav" };
  const folder = contentType.startsWith("audio/") ? "audios" : "fotos";
  const name = `${folder}/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}.${EXT[contentType] || "bin"}`;
  if (blobReady) {
    const res = await put(name, buffer, { access: "public", contentType, addRandomSuffix: false });
    return res.url;
  }
  if (process.env.VERCEL) throw new Error("Falta conectar Vercel Blob al proyecto");
  const mem = globalThis.__mesaImgs || (globalThis.__mesaImgs = {});
  const id = name.replace(/[^a-z0-9.]/gi, "_");
  mem[id] = { buffer: Buffer.from(buffer), contentType };
  return `api/upload?f=${id}`;
}

// Solo desarrollo local: devuelve una foto guardada en memoria.
export function localImage(id) {
  return (globalThis.__mesaImgs || {})[id] || null;
}

export async function removeBlob(url) {
  if (!blobReady || !/^https:\/\/[^/]+\.blob\.vercel-storage\.com\//.test(url)) return;
  try { await del(url); } catch { /* si ya no existe, no pasa nada */ }
}
