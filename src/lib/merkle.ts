/**
 * Daily Merkle tree from a set of SHA-256 withdrawal fingerprints, using
 * @openzeppelin/merkle-tree (SimpleMerkleTree: leaves are already 32-byte
 * digests; internal nodes combine with commutative keccak256).
 */
import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";

export interface MerkleOutput {
  root: string; // 0x-prefixed hex
  tree: SimpleMerkleTree;
}

/** Build a tree from hex SHA-256 hashes (with or without 0x prefix). */
export function buildMerkle(hashes: string[]): MerkleOutput {
  const leaves = hashes.map((h) => "0x" + h.replace(/^0x/, "").toLowerCase());
  const tree = SimpleMerkleTree.of(leaves);
  return { root: tree.root, tree };
}

/** Inclusion proof for one leaf hash (used by the evidence export). */
export function proofFor(tree: SimpleMerkleTree, hash: string): string[] {
  const target = "0x" + hash.replace(/^0x/, "").toLowerCase();
  for (const [i, leaf] of tree.entries()) {
    if (String(leaf).toLowerCase() === target) return tree.getProof(i);
  }
  return [];
}
