import type { Policy, PolicyConfig } from "../types";

export const POLICY_STATUS_MAP: Record<Policy, Omit<PolicyConfig, "label">> = {
  open: {
    boxShadow: "0px 2px 10px rgba(0, 74, 9, 0.25)",
    gradient: "linear-gradient(360deg, #004a09 0%, #003b07 100%)",
  },
  approval_required: {
    boxShadow: "0px 2px 10px rgba(161, 98, 7, 0.25)",
    gradient: "linear-gradient(360deg, #f59e0b 0%, #b45309 100%)",
  },
};
