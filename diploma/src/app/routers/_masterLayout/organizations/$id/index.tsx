import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/organizations/$id/"!</div>;
}
