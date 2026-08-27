import type { OrganizationPolicyValue } from "../model/types";

export const normalizeOrganizationPolicy = (
  value: string | null | undefined,
  fallback: OrganizationPolicyValue,
): OrganizationPolicyValue =>
  value === "open" || value === "approval_required" ? value : fallback;
