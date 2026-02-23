const PROFILE_ROOT = "/profile" as const;

export const profileRoutes = {
  root: PROFILE_ROOT,
  settings: `${PROFILE_ROOT}/settings` as const,
  settingsFrom: `${PROFILE_ROOT}/settings/` as const,
} as const;
