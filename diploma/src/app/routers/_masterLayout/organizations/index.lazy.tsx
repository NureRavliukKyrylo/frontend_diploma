import { OrganizationsPage } from "@pages/organizations";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/organizations/")({
  component: OrganizationsPage,
});
