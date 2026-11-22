// Clave compartida: si APP_PIN está configurada en Vercel, toda petición debe traerla en x-mesa-pin.
export function unauthorized(request) {
  const pin = process.env.APP_PIN;
  if (!pin) return null;
  const sent = request.headers.get("x-mesa-pin") || "";
  if (sent === pin) return null;
  return json({ error: "Clave incorrecta" }, 401);
}

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

// Personas de la pareja: PEOPLE="Sebas,Laura" en Vercel. El id es el nombre en minúsculas sin tildes.
export function people() {
  const raw = (process.env.PEOPLE || "Sebas,Laura").split(",").map((s) => s.trim()).filter(Boolean);
  return raw.map((name) => ({
    id: name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
  }));
}
