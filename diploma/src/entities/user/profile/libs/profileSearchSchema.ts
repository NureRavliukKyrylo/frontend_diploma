import z from "zod";

export const profileSearchDefaults = {
  tab: "profile" as const,
  OrderBy: "Default" as const,
  Page: 1,
};

export const profileSettingsSearchDefaults = {
  tab: "settings" as const,
};

export const profileSearchSchema = z.object({
  tab: z
    .enum(["profile", "projects", "skills", "inventory"])
    .default("profile")
    .catch("profile"),
  OrderBy: z
    .enum(["Default", "NameAsc", "NameDesc"])
    .default("Default")
    .catch("Default")
    .optional(),
  Page: z.number().default(1).optional(),
  Search: z.string().optional(),
});

export const profileSettingsSearchSchema = z.object({
  tab: z
    .enum(["settings", "links", "security"])
    .default("settings")
    .catch("settings"),
});

export type ProfileSearchParams = z.infer<typeof profileSearchSchema>;
export type ProfileSettingsSearchParams = z.infer<
  typeof profileSettingsSearchSchema
>;
