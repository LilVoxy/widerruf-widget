/**
 * RFC 3161 Time-Stamp Protocol client (DigiCert TSA by default).
 * Builds a TimeStampReq for the Merkle root and returns the DER token from the
 * TimeStampResp. Node runtime only.
 */
import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import { seq, int, intFromBytes, octet, nullVal, bool, oid, readTLV, children } from "./asn1";

// id-sha256 = 2.16.840.1.101.3.4.2.1
const SHA256_OID = [0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x01];

/** Build a DER-encoded TimeStampReq over SHA-256(rootBytes). */
export function buildTimeStampReq(rootHex: string): Buffer {
  const rootBytes = Buffer.from(rootHex.replace(/^0x/, ""), "hex");
  const imprint = crypto.createHash("sha256").update(rootBytes).digest();

  const algId = seq(oid(SHA256_OID), nullVal()); // AlgorithmIdentifier { sha256, NULL }
  const messageImprint = seq(algId, octet(imprint));

  const version = int(1);
  const nonce = intFromBytes(crypto.randomBytes(8));
  const certReq = bool(true);

  // TimeStampReq ::= SEQUENCE { version, messageImprint, [reqPolicy], [nonce], certReq, [ext] }
  return seq(version, messageImprint, nonce, certReq);
}

export interface TsaResult {
  tokenDer: Buffer;
  status: number;
}

/**
 * Send the request to the TSA. Throws on HTTP failure or a non-granted status.
 * `status` 0 = granted, 1 = grantedWithMods.
 */
export async function requestTimestamp(rootHex: string, tsaUrl: string): Promise<TsaResult> {
  const reqDer = buildTimeStampReq(rootHex);

  const res = await fetch(tsaUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/timestamp-query",
      Accept: "application/timestamp-reply",
    },
    body: reqDer as unknown as BodyInit,
  });
  if (!res.ok) throw new Error(`TSA HTTP ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());

  // TimeStampResp ::= SEQUENCE { status PKIStatusInfo, timeStampToken TimeStampToken OPTIONAL }
  const outer = readTLV(buf, 0);
  const top = children(buf, outer);
  const statusInfo = top[0]; // PKIStatusInfo ::= SEQUENCE { status INTEGER, ... }
  const statusKids = children(buf, statusInfo);
  const statusNode = statusKids[0];
  const status = buf[statusNode.contentStart + statusNode.length - 1]; // last byte of the small INTEGER

  if (status !== 0 && status !== 1) throw new Error(`TSA status ${status}`);
  if (top.length < 2) throw new Error("TSA returned no timeStampToken");

  const token = top[1];
  const tokenDer = Buffer.from(buf.subarray(token.start, token.end));
  return { tokenDer, status };
}

/** Exponential backoff wrapper: attempts, doubling delay each retry. */
export async function withBackoff<T>(
  fn: () => Promise<T>,
  attempts = 4,
  baseDelayMs = 500
): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) {
        const delay = baseDelayMs * 2 ** i + Math.floor(Math.random() * 250);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastErr;
}
