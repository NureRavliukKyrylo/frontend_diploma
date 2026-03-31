import z from "zod";
import { paginationSchema } from "@shared/config/schemas";

export const profileSearchDefaults = {
  tab: "profile" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 8,
};

export const profileSettingsSearchDefaults = {
  tab: "settings" as const,
};

export const profileSearchBaseSchema = z.object({
  tab: z
    .enum(["profile", "statistics", "skills", "inventory"])
    .default("profile")
    .catch("profile"),
  OrderBy: z
    .enum(["Default", "NameAsc", "NameDesc"])
    .default("Default")
    .catch("Default")
    .optional(),
  Search: z.string().optional(),
});

export const profileSearchSchema = profileSearchBaseSchema
  .extend(paginationSchema.shape)
  .extend({
    PageSize: z.number().min(1).default(8).optional(),
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
