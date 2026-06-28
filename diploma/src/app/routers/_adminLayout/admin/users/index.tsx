import { adminUsersSearchDefaults, adminUsersSearchSchema } from "@entities/admin";
import { AdminUsersPage } from "@pages/admin";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_adminLayout/admin/users/")({
  validateSearch: adminUsersSearchSchema,
  search: {
    middlewares: [stripSearchParams(adminUsersSearchDefaults)],
  },
  component: AdminUsersPage,
});
