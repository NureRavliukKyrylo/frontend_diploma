import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/offers/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/offers/$id/"!</div>;
}
