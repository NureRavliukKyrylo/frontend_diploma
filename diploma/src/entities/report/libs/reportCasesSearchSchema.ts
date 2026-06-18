import { z } from "zod";
import { paginationSchema } from "@shared/config/schemas";
import { ModerationSubjectType, ReportReasonType } from "../model";

export const reportCasesSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 12,
};

export const reportCasesSearchSchema = z
  .object({
    reportId: z.string().optional(),
    Search: z.string().optional(),
    OrderBy: z
      .enum(["Default", "Newest", "Latest"])
      .default("Default")
      .catch("Default"),
    Status: z
      .enum(["open", "resolved", "rejected"])
      .optional()
      .catch(undefined),
    From: z.string().optional(),
    To: z.string().optional(),
    SubjectTypes: z
      .array(
        z.enum(
          Object.keys(ModerationSubjectType) as Array<
            keyof typeof ModerationSubjectType
          >,
        ),
      )
      .optional()
      .catch(undefined),
    Reasons: z
      .array(
        z.enum(
          Object.keys(ReportReasonType) as Array<keyof typeof ReportReasonType>,
        ),
      )
      .optional()
      .catch(undefined),
  })
  .extend(paginationSchema.shape)
  .extend({ PageSize: z.number().default(12) });

export type ReportCasesSearchParams = z.infer<typeof reportCasesSearchSchema>;
