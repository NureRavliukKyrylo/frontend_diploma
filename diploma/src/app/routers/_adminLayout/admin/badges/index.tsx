import {
  adminBadgesSearchDefaults,
  adminBadgesSearchSchema,
} from "@entities/badge";
import { AdminBadgesPage } from "@pages/admin";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_adminLayout/admin/badges/")({
  validateSearch: adminBadgesSearchSchema,
  search: {
    middlewares: [stripSearchParams(adminBadgesSearchDefaults)],
  },
  component: AdminBadgesPage,
});
