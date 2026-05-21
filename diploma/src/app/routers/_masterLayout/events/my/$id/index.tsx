import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/my/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/events/my/$id/"!</div>;
}
