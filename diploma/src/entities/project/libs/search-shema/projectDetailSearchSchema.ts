import z from "zod";

export const projectDetailDefaults = {
  tab: "overview" as const,
};

export const projectDetailSchema = z.object({
  tab: z
    .enum(["overview", "members", "feedback", "events", "tasks"])
    .default("overview")
    .catch("overview"),
});
