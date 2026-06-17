import { POLICY_STATUS_MAP } from "@shared/config/constants";
import type { Policy, PolicyConfig } from "@shared/config/types";
import type { TFunction } from "i18next";

export const getPolicyStatusConfig = (
  policy: Policy,
  t: TFunction,
): PolicyConfig => {
  const visualConfig = POLICY_STATUS_MAP[policy] ?? POLICY_STATUS_MAP.open;

  const fallbackLabels: Record<Policy, string> = {
    open: "Open to join",
    approval_required: "Approval required",
  };

  return {
    ...visualConfig,
    label: t(`common:policies.${policy}`, {
      defaultValue: fallbackLabels[policy],
    }),
  };
};
