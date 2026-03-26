import {
  projectDetailDefaults,
  projectDetailSchema,
  projectQuery,
} from "@entities/project";
import { ProjectPage, ProjectPageSkeleton } from "@pages/projects";
import { participationQuery } from "@shared/api/participation";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/$id/")({
  component: ProjectPage,
  validateSearch: projectDetailSchema,
  search: {
    middlewares: [stripSearchParams(projectDetailDefaults)],
  },
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await queryClient.ensureQueryData(projectQuery.id(id));
    queryClient.prefetchInfiniteQuery(
      participationQuery.membersInfinite({
        entityId: id,
        entityType: "project",
        pageSize: 9,
      }),
    );
  },
  pendingComponent: ProjectPageSkeleton,
});
