import { useUserStore } from "@entities/user";
import { ArchivedOrganizationsPage } from "@pages/organizations";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_masterLayout/organizations/archived/",
)({
  beforeLoad: () => {
    if (!useUserStore.getState().isAuthenticated) {
      throw redirect({
        to: "/auth",
      });
    }
  },
  component: ArchivedOrganizationsPage,
});
