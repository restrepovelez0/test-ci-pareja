// Fotos: Vercel Blob en producción (necesita BLOB_READ_WRITE_TOKEN).
// En desarrollo local, sin token, las fotos se guardan en memoria y se sirven desde /api/upload?f=…
import { put, del } from "@vercel/blob";

export const blobReady = !!process.env.BLOB_READ_WRITE_TOKEN;

export async function saveImage(buffer, contentType) {
  const ext = contentType === "image/png" ? "png" : contentType === "image/webp" ? "webp" : "jpg";
  const name = `fotos/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
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
