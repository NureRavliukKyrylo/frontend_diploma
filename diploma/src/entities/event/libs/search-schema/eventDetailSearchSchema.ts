import z from "zod";

export const eventDetailDefaults = {
  tab: "overview" as const,
};

export const eventDetailSchema = z.object({
  tab: z
    .enum(["overview", "members", "feedback", "tasks"])
    .default("overview")
    .catch("overview"),
});
