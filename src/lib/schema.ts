import { z } from "zod";

/**
 * Server-side Zod schema for the withdrawal payload. This is the source of
 * truth — client validation is only a UX convenience.
 *
 * Data minimization (§ 356a BGB + Art. 5(1)(c) DSGVO): exactly three fields.
 * `.strict()` REJECTS any extra key — most importantly a "reason"/"grund"
 * field, which is legally forbidden.
 */
export const WithdrawSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    order_id: z.string().trim().min(1).max(64),
    email: z.string().trim().toLowerCase().email().max(254),
  })
  .strict();

export type WithdrawInput = z.infer<typeof WithdrawSchema>;
