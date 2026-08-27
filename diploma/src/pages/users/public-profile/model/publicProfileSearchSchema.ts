import { z } from "zod";

export const publicProfileSearchSchema = z.object({
  organizationId: z.string().optional().catch(undefined),
});

export type PublicProfileSearch = z.infer<typeof publicProfileSearchSchema>;
