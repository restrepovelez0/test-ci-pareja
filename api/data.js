// GET  /api/data  → { people, places, reviews, photos, recipes, recipeReviews }
// POST /api/data  → { op: "set" | "del", coll, id, data? }
import { all, get, set, del, getFlag, setFlag, COLLECTIONS } from "../lib/store.js";
import { removeBlob } from "../lib/blob.js";
import { unauthorized, json, people } from "../lib/auth.js";
import { seed } from "../lib/seed.js";

const ID = /^[A-Za-z0-9_-]{1,80}$/;
const MAX_DOC = 20_000; // bytes por documento

async function seedOnce() {
  if (process.env.SEED === "off") return;
  if (!(await getFlag("seeded"))) {
    await setFlag("seeded");
    if (!(await all("places")).length)
      for (const coll of ["places", "reviews", "photos"]) for (const doc of seed[coll]) await set(coll, doc.id, doc);
  }
  if (!(await getFlag("seeded-recetas"))) {
    await setFlag("seeded-recetas");
    if (!(await all("recipes")).length)
      for (const coll of ["recipes", "recipeReviews"]) for (const doc of seed[coll]) await set(coll, doc.id, doc);
  }
}

export async function GET(request) {
  const denied = unauthorized(request);
  if (denied) return denied;
  await seedOnce();
  const [places, reviews, photos, recipes, recipeReviews] = await Promise.all(COLLECTIONS.map(all));
  return json({ people: people(), places, reviews, photos, recipes, recipeReviews });
}

export async function POST(request) {
  const denied = unauthorized(request);
  if (denied) return denied;
  let body;
  try { body = await request.json(); } catch { return json({ error: "JSON inválido" }, 400); }
  const { op, coll, id, data } = body || {};
  if (!COLLECTIONS.includes(coll)) return json({ error: "Colección desconocida" }, 400);
  if (!ID.test(String(id || ""))) return json({ error: "Id inválido" }, 400);

  if (op === "set") {
    if (!data || typeof data !== "object" || Array.isArray(data)) return json({ error: "Faltan datos" }, 400);
    if (JSON.stringify(data).length > MAX_DOC) return json({ error: "Documento demasiado grande" }, 413);
    await set(coll, id, data);
    return json({ ok: true });
  }
  if (op === "del") {
    if (coll === "photos") {
      const row = await get("photos", id);
      if (row?.url) await removeBlob(row.url);
    }
    await del(coll, id);
    return json({ ok: true });
  }
  return json({ error: "Operación desconocida" }, 400);
}
