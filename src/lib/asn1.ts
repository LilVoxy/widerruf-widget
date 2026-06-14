/**
 * Minimal ASN.1 DER encoder/decoder — just enough to build an RFC 3161
 * TimeStampReq and to extract the timeStampToken from a TimeStampResp.
 * Node runtime only (uses Buffer).
 */
import { Buffer } from "node:buffer";

export const TAG = {
  BOOLEAN: 0x01,
  INTEGER: 0x02,
  OCTET_STRING: 0x04,
  NULL: 0x05,
  OID: 0x06,
  SEQUENCE: 0x30,
} as const;

function encodeLength(n: number): Buffer {
  if (n < 0x80) return Buffer.from([n]);
  const out: number[] = [];
  let v = n;
  while (v > 0) {
    out.unshift(v & 0xff);
    v >>= 8;
  }
  return Buffer.from([0x80 | out.length, ...out]);
}

export function tlv(tag: number, content: Buffer): Buffer {
  return Buffer.concat([Buffer.from([tag]), encodeLength(content.length), content]);
}

/** Encode a small non-negative integer. */
export function int(value: number): Buffer {
  const out: number[] = [];
  let v = value;
  do {
    out.unshift(v & 0xff);
    v >>= 8;
  } while (v > 0);
  if (out[0] & 0x80) out.unshift(0x00); // keep it positive
  return tlv(TAG.INTEGER, Buffer.from(out));
}

/** Encode an INTEGER from raw bytes (e.g. a random nonce), forced positive. */
export function intFromBytes(bytes: Buffer): Buffer {
  let b = bytes;
  if (b.length === 0) b = Buffer.from([0]);
  if (b[0] & 0x80) b = Buffer.concat([Buffer.from([0x00]), b]);
  return tlv(TAG.INTEGER, b);
}

export function octet(bytes: Buffer): Buffer {
  return tlv(TAG.OCTET_STRING, bytes);
}
export function nullVal(): Buffer {
  return tlv(TAG.NULL, Buffer.alloc(0));
}
export function bool(v: boolean): Buffer {
  return tlv(TAG.BOOLEAN, Buffer.from([v ? 0xff : 0x00]));
}
/** Pre-encoded OID content bytes → full OID TLV. */
export function oid(contentBytes: number[]): Buffer {
  return tlv(TAG.OID, Buffer.from(contentBytes));
}
export function seq(...parts: Buffer[]): Buffer {
  return tlv(TAG.SEQUENCE, Buffer.concat(parts));
}

// ── decoding ────────────────────────────────────────────────────────────────

export interface Node {
  tag: number;
  start: number; // index of the tag byte
  headerLen: number; // tag + length bytes
  length: number; // content length
  contentStart: number;
  end: number; // exclusive
}

export function readTLV(buf: Buffer, offset: number): Node {
  const tag = buf[offset];
  let i = offset + 1;
  let length = buf[i++];
  if (length & 0x80) {
    const numBytes = length & 0x7f;
    length = 0;
    for (let k = 0; k < numBytes; k++) length = (length << 8) | buf[i++];
  }
  const contentStart = i;
  return {
    tag,
    start: offset,
    headerLen: contentStart - offset,
    length,
    contentStart,
    end: contentStart + length,
  };
}

/** Parse the content of a constructed node into its child TLVs. */
export function children(buf: Buffer, node: Node): Node[] {
  const out: Node[] = [];
  let i = node.contentStart;
  while (i < node.end) {
    const child = readTLV(buf, i);
    out.push(child);
    i = child.end;
  }
  return out;
}
