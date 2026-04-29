import z from "zod";

export const profileSettingsSearchDefaults = {
  tab: "settings" as const,
};

export const profileSettingsSearchSchema = z.object({
  tab: z
    .enum(["settings", "links", "security"])
    .default("settings")
    .catch("settings"),
});

export type ProfileSettingsSearchParams = z.infer<
  typeof profileSettingsSearchSchema
>;
