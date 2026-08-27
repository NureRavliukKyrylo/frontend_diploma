import { z } from "zod";

export const paginationSchema = z.object({
  Page: z.number().min(1).default(1).optional(),
  PageSize: z.number().min(1).default(9).optional(),
});

export const mapBoundsSchema = z.object({
  MinLat: z.number().min(-90).max(90).optional(),
  MaxLat: z.number().min(-90).max(90).optional(),
  MinLng: z.number().min(-180).max(180).optional(),
  MaxLng: z.number().min(-180).max(180).optional(),
});

export const locationSchema = z.object({
  Lat: z.number().min(-90).max(90).optional(),
  Lng: z.number().min(-180).max(180).optional(),
  Location: z.string().optional(),
  RadiusKm: z.number().optional(),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
export type MapBoundsParams = z.infer<typeof mapBoundsSchema>;
export type LocationParams = z.infer<typeof locationSchema>;
