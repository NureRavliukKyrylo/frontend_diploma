import type { TabOption } from "@shared/config/types";
import type { AuthMode } from "@entities/user";

export const authTabs: TabOption<AuthMode>[] = [
  { label: "Sign In", value: "signin" },
  { label: "Sign Up", value: "signup" },
];
