import { createFileRoute } from "@tanstack/react-router";
import { projectQuery } from "@entities/project";
import { RecommendedVolunteersPage } from "@pages/organizations";

export const Route = createFileRoute(
  "/_masterLayout/projects/$id/recommendations/",
)({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(projectQuery.id(params.id));
  },
  component: ProjectRecommendationsRoute,
});

function ProjectRecommendationsRoute() {
  const { id } = Route.useParams();

  return <RecommendedVolunteersPage entityType="project" entityId={id} />;
}
