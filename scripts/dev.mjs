// Servidor local para probar sin Vercel: `npm install` y luego `npm run dev`.
// Sirve los archivos estáticos y las funciones de /api. Sin variables de entorno, guarda todo en memoria.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json" };

async function toRequest(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  return new Request(`http://localhost:${port}${req.url}`, { method: req.method, headers: req.headers, body: ["GET", "HEAD"].includes(req.method) ? undefined : body });
}

http.createServer(async (req, res) => {
  try {
    const path = new URL(req.url, "http://x").pathname;
    if (path.startsWith("/api/")) {
      const mod = await import(join(root, path.replace(/\/$/, "") + ".js"));
      const handler = mod[req.method];
      if (!handler) { res.writeHead(405).end(); return; }
      const out = await handler(await toRequest(req));
      res.writeHead(out.status, Object.fromEntries(out.headers));
      res.end(Buffer.from(await out.arrayBuffer()));
      return;
    }
    let file = normalize(join(root, path === "/" ? "index.html" : path));
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, "index.html");
    const data = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch (err) {
    res.writeHead(err.code === "ENOENT" ? 404 : 500, { "content-type": "text/plain; charset=utf-8" });
    res.end(err.code === "ENOENT" ? "No encontrado" : String(err));
  }
}).listen(port, () => console.log(`Mesa para Dos en http://localhost:${port}`));
