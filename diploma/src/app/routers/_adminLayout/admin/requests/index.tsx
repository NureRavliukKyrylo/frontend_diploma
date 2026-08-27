import {
  adminRequestsSearchDefaults,
  adminRequestsSearchSchema,
} from "@entities/admin";
import { AdminRequestsPage } from "@pages/admin";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_adminLayout/admin/requests/")({
  validateSearch: adminRequestsSearchSchema,
  search: {
    middlewares: [stripSearchParams(adminRequestsSearchDefaults)],
  },
  component: AdminRequestsPage,
});
