// Almacenamiento de datos: Upstash Redis en producción, memoria en desarrollo local.
// Cada colección es un hash de Redis: mesa:places, mesa:reviews, mesa:photos (campo = id, valor = JSON).
import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export const COLLECTIONS = ["places", "reviews", "photos"];
export const usingRedis = !!redis;

const mem = globalThis.__mesaMem || (globalThis.__mesaMem = { places: {}, reviews: {}, photos: {}, flags: {} });
const key = (coll) => `mesa:${coll}`;
const parse = (v) => (typeof v === "string" ? JSON.parse(v) : v);

export async function all(coll) {
  if (redis) {
    const h = (await redis.hgetall(key(coll))) || {};
    return Object.entries(h).map(([id, v]) => ({ ...parse(v), id }));
  }
  return Object.entries(mem[coll]).map(([id, v]) => ({ ...v, id }));
}

export async function get(coll, id) {
  if (redis) {
    const v = await redis.hget(key(coll), id);
    return v ? { ...parse(v), id } : null;
  }
  return mem[coll][id] ? { ...mem[coll][id], id } : null;
}

export async function set(coll, id, data) {
  const { id: _omit, ...rest } = data || {};
  if (redis) return redis.hset(key(coll), { [id]: JSON.stringify(rest) });
  mem[coll][id] = rest;
}

export async function del(coll, id) {
  if (redis) return redis.hdel(key(coll), id);
  delete mem[coll][id];
}

export async function getFlag(name) {
  if (redis) return redis.get(`mesa:flag:${name}`);
  return mem.flags[name] || null;
}

export async function setFlag(name, value = "1") {
  if (redis) return redis.set(`mesa:flag:${name}`, value);
  mem.flags[name] = value;
}
