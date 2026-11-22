// POST /api/upload  (cuerpo: la imagen ya comprimida en el navegador) → { url }
import { saveImage, localImage, blobReady } from "../lib/blob.js";
import { unauthorized, json } from "../lib/auth.js";

const MAX = 4 * 1024 * 1024; // Vercel acepta hasta ~4,5 MB por petición
const TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request) {
  const denied = unauthorized(request);
  if (denied) return denied;
  const type = (request.headers.get("content-type") || "").split(";")[0].trim();
  if (!TYPES.includes(type)) return json({ error: "Solo se aceptan fotos JPG, PNG o WebP" }, 415);
  const buf = Buffer.from(await request.arrayBuffer());
  if (!buf.length) return json({ error: "La foto llegó vacía" }, 400);
  if (buf.length > MAX) return json({ error: "La foto pesa más de 4 MB" }, 413);
  try {
    const url = await saveImage(buf, type);
    return json({ url });
  } catch (err) {
    return json({ error: err.message || "No se pudo guardar la foto" }, 500);
  }
}

// Solo en desarrollo local (sin Vercel Blob): sirve las fotos guardadas en memoria.
export async function GET(request) {
  if (blobReady || process.env.VERCEL) return new Response("No encontrado", { status: 404 });
  const img = localImage(new URL(request.url).searchParams.get("f") || "");
  if (!img) return new Response("No encontrado", { status: 404 });
  return new Response(img.buffer, { headers: { "content-type": img.contentType } });
}
