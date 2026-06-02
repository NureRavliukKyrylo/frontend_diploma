import { paginationSchema } from "@shared/config/schemas";
import { offersFiltersSchema } from "./offersSearchSchema";
import type z from "zod";

export const offersJoinedSearchSchema = offersFiltersSchema.extend(
  paginationSchema.shape,
);

export type OfferJoinedSearchParams = z.infer<typeof offersJoinedSearchSchema>;
