import { z } from "zod";

export const calendarDefaults = {
  tab: "dayGridMonth" as const,
};

export const calendarSearchSchema = z.object({
  tab: z
    .enum(["dayGridMonth", "timeGridWeek", "timeGridDay"])
    .optional()
    .catch("dayGridMonth"),
  date: z.string().optional(),
});
