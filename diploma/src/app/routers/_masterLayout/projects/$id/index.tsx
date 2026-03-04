import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/projects/$id/"!</div>;
}
