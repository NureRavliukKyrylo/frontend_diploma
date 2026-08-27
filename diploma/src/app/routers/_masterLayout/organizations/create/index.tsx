import { CreateOrganizationPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/create/")({
  component: CreateOrganizationPage,
});
