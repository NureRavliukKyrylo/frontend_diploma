import { paginationSchema } from "@shared/config/schemas";
import { offersFiltersSchema } from "./offersSearchSchema";
import type z from "zod";

export const offersMySearchSchema = offersFiltersSchema.extend(
  paginationSchema.shape,
);

export type OfferMySearchParams = z.infer<typeof offersMySearchSchema>;
