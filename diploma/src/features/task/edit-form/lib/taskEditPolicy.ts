import type { Policy } from "@shared/config/types";

export const normalizeTaskPolicy = (
  value: string | null | undefined,
  fallback: Policy,
): Policy => {
  const normalized = value?.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return normalized === "open" || normalized === "approval_required"
    ? normalized
    : fallback;
};
