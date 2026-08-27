import z from "zod";
import { paginationSchema } from "@shared/config/schemas";
import type { ProfileMode } from "../../model";

export const profileSearchDefaults = {
  profile: {
    tab: "profile" as const,
  },
  skills: {
    tab: "skills" as const,
    OrderBy: "Default" as const,
    Page: 1,
    PageSize: 8,
  },
  inventory: {
    tab: "inventory" as const,
    PageSize: 4,
  },
  statistics: {
    tab: "statistics" as const,
  },
};

export const profileTabSchema = z.object({
  tab: z.literal("profile"),
});

export const skillsTabSchema = z.object({
  tab: z.literal("skills"),
  OrderBy: z
    .enum(["Default", "NameAsc", "NameDesc"])
    .default("Default")
    .catch("Default"),
  Search: z.string().optional(),
  Page: paginationSchema.shape.Page,
  PageSize: z.number().min(1).default(8).catch(8),
});

export const inventoryTabSchema = z.object({
  tab: z.literal("inventory"),
  badgeId: z.string().optional(),
  PageSize: z.number().min(1).default(4).catch(4),
});

export const statisticsTabSchema = z.object({
  tab: z.literal("statistics"),
});

export const profileSearchSchema = z
  .discriminatedUnion("tab", [
    profileTabSchema,
    skillsTabSchema,
    inventoryTabSchema,
    statisticsTabSchema,
  ])
  .catch((ctx) => {
    const input = ctx.value as any;
    const tab = input?.tab ?? "profile";
    const defaults =
      profileSearchDefaults[tab as ProfileMode] ??
      profileSearchDefaults.profile;
    return { ...defaults, ...input };
  });

export type ProfileSearchParams = z.infer<typeof profileSearchSchema>;
export type SkillsProfileSearchParams = Omit<
  z.infer<typeof skillsTabSchema>,
  "tab"
>;
export type InventoryProfileSearchParams = Omit<
  z.infer<typeof inventoryTabSchema>,
  "tab"
>;
