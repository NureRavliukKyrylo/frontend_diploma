import type { Coordinates } from "@shared/config/types";

export interface Organization {
  id: string;
  name: string;
  logoUrl: string;
  location: Coordinates;
}
