import { eventQuery } from "@entities/event";
import { organizationQuery } from "@entities/organization";
import { projectQuery } from "@entities/project";
import { tasksSearchDefaults, tasksSearchSchema } from "@entities/task";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/tasks/")({
  validateSearch: tasksSearchSchema,
  search: { middlewares: [stripSearchParams(tasksSearchDefaults)] },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(projectQuery.infinite({ PageSize: 7 }));
    queryClient.prefetchInfiniteQuery(
      organizationQuery.infinite({ PageSize: 7 }),
    );
    queryClient.prefetchInfiniteQuery(eventQuery.infinite({ PageSize: 7 }));
  },
});
