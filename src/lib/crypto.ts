/**
 * Cryptographic core — edge-runtime compatible (Web Crypto API).
 *
 * - Deterministic canonical JSON (alphabetically sorted keys) so the SHA-256
 *   fingerprint is reproducible by any third party verifying the Proof-URL.
 * - SHA-256 hex digest (same output as Node's crypto.createHash('sha256'); we
 *   use crypto.subtle.digest because the intake route runs on Vercel Edge).
 * - AES-256-GCM field encryption for PII at rest (email, consumer name).
 */
import { env } from "./env";

/** Canonical hashing object — keys MUST stay alphabetical. */
export interface CanonicalInput {
  email: string;
  order_id: string;
  shop_id: string;
  timestamp_iso8601: string;
}

/** Serialize with alphabetically sorted keys (deterministic across platforms). */
export function canonicalJson(obj: Record<string, unknown>): string {
  const keys = Object.keys(obj).sort();
  const parts = keys.map((k) => JSON.stringify(k) + ":" + JSON.stringify(obj[k]));
  return "{" + parts.join(",") + "}";
}

function toHex(buf: ArrayBuffer): string {
  const b = new Uint8Array(buf);
  let out = "";
  for (let i = 0; i < b.length; i++) out += b[i].toString(16).padStart(2, "0");
  return out;
}

/** SHA-256 hex of an arbitrary string. */
export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data as unknown as BufferSource);
  return toHex(digest);
}

/**
 * Compute the legal fingerprint for a withdrawal. The canonical JSON is
 * `{ "email", "order_id", "shop_id", "timestamp_iso8601" }` (sorted).
 */
export async function withdrawalHash(input: CanonicalInput): Promise<{ hash: string; canonical: string }> {
  const canonical = canonicalJson({
    email: input.email,
    order_id: input.order_id,
    shop_id: input.shop_id,
    timestamp_iso8601: input.timestamp_iso8601,
  });
  const hash = await sha256Hex(canonical);
  return { hash, canonical };
}

// ── Field encryption (AES-256-GCM) ──────────────────────────────────────────

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function bytesToB64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

let keyPromise: Promise<CryptoKey> | null = null;
function getKey(): Promise<CryptoKey> {
  if (!keyPromise) {
    const raw = b64ToBytes(env.fieldKey());
    if (raw.length !== 32) throw new Error("FIELD_ENCRYPTION_KEY must be 32 bytes (base64).");
    keyPromise = crypto.subtle.importKey("raw", raw as unknown as BufferSource, "AES-GCM", false, ["encrypt", "decrypt"]);
  }
  return keyPromise;
}

/** Encrypt plaintext → base64("v1:" iv|ciphertext|tag). Returns "" for empty input. */
export async function encryptField(plaintext: string): Promise<string> {
  if (!plaintext) return "";
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as unknown as BufferSource },
    key,
    new TextEncoder().encode(plaintext) as unknown as BufferSource
  );
  const ctBytes = new Uint8Array(ct);
  const packed = new Uint8Array(iv.length + ctBytes.length);
  packed.set(iv, 0);
  packed.set(ctBytes, iv.length);
  return "v1:" + bytesToB64(packed);
}

/** Decrypt a value produced by {@link encryptField}. */
export async function decryptField(value: string | null): Promise<string> {
  if (!value) return "";
  if (!value.startsWith("v1:")) return value; // legacy/plaintext tolerance
  const key = await getKey();
  const packed = b64ToBytes(value.slice(3));
  const iv = packed.slice(0, 12);
  const ct = packed.slice(12);
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as unknown as BufferSource },
    key,
    ct as unknown as BufferSource
  );
  return new TextDecoder().decode(pt);
}
