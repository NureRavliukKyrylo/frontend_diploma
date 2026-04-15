import {
  organizationSearchDefaults,
  organizationSearchSchema,
} from "@entities/organization";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/")({
  component: RouteComponent,
  validateSearch: organizationSearchSchema,
  search: {
    middlewares: [stripSearchParams(organizationSearchDefaults)],
  },
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/organizations/"!</div>;
}
