import { eventsSearchSchema, eventSearchDefaults } from "@entities/event";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/")({
  component: RouteComponent,
  validateSearch: eventsSearchSchema,
  search: {
    middlewares: [stripSearchParams(eventSearchDefaults)],
  },
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/events/"!</div>;
}
