import { POLICY_STATUS_MAP } from "@shared/config/constants";
import type { Policy, PolicyConfig } from "@shared/config/types";

export const getPolicyStatusConfig = (policy: Policy): PolicyConfig =>
  POLICY_STATUS_MAP[policy] ?? POLICY_STATUS_MAP.open;
