import { paginationSchema } from "@shared/config/schemas";
import z from "zod";
import { relatedEntityTypeChatValues } from "../config";
import type { RelatedEntityTypeChatValue } from "../model";

export const chatDefaults = {
  Page: 1,
  PageSize: 3,
};

export const chatPaginationSchema = paginationSchema.extend({
  PageSize: z.number().default(3).catch(3),
});

export const chatSearchSchema = chatPaginationSchema.extend({
  chatId: z.string().optional().catch(undefined),
  Search: z.string().optional(),
  RelatedEntityType: z
    .array(z.enum(relatedEntityTypeChatValues))
    .optional()
    .catch(undefined),
});

export type ChatSearchQuery = Omit<
  z.infer<typeof chatSearchSchema>,
  "chatId" | "RelatedEntityType"
> & { RelatedEntityType: RelatedEntityTypeChatValue };

export type ChatSearchParams = Omit<z.infer<typeof chatSearchSchema>, "chatId">;
