import {
  joinedProjectDefaults,
  joinedProjectSearchSchema,
} from "@entities/project";
import { createFileRoute } from "@tanstack/react-router";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";

export const Route = createFileRoute("/_masterLayout/projects/my/$id/")({
  validateSearch: joinedProjectSearchSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(joinedProjectDefaults, "overview"),
    ],
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/projects/my/$id/"!</div>;
}
