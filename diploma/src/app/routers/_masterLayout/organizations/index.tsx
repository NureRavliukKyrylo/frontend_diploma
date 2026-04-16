import {
  organizationSearchDefaults,
  organizationSearchSchema,
} from "@entities/organization";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/")({
  validateSearch: organizationSearchSchema,
  search: {
    middlewares: [stripSearchParams(organizationSearchDefaults)],
  },
});
