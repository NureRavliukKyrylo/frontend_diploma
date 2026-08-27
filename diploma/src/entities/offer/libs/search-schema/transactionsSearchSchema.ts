import { paginationSchema } from "@shared/config/schemas";
import { z } from "zod";

export const transactionSearchDefaults = {
  tab: "transactions" as const,
  Page: 1,
  PageSize: 12,
};

export const transactionsSearchSchema = z
  .object({
    tab: z
      .literal("transactions")
      .default("transactions")
      .catch("transactions"),
    From: z.string().optional(),
    To: z.string().optional(),
    Type: z
      .enum([
        "earn",
        "spend",
        "reservation",
        "reservationRelease",
        "adminAdjustmentPlus",
        "adminAdjustmentMinus",
        "giftIn",
        "giftOut",
      ])
      .optional()
      .catch(undefined),
    SourceType: z
      .enum([
        "eventAttendance",
        "priorityReservation",
        "adminAdjustment",
        "gift",
        "timeSpend",
      ])
      .optional()
      .catch(undefined),
  })
  .extend(paginationSchema.shape)
  .extend({ PageSize: z.number().default(12) });

export type TransactionsSearchParams = Omit<
  z.infer<typeof transactionsSearchSchema>,
  "tab"
>;
