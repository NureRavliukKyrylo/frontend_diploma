import {
  myProjectSearchDefaults,
  myProjectsFiltersSchema,
} from "@entities/project";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/my/")({
  component: RouteComponent,
  validateSearch: myProjectsFiltersSchema,
  search: {
    middlewares: [stripSearchParams(myProjectSearchDefaults)],
  },
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/projects/my/"!</div>;
}
