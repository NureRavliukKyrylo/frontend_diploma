import type { PaginationResponse } from "@shared/config/types";
import type { Organization } from "./organization/Organization";

export interface OrganizationResponse {
  data: Organization[];
  pagination: PaginationResponse;
}

export type MyOrganizationsResponse = OrganizationResponse;
