import { projectQuery } from "@entities/project";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { EntityRolesPage } from "@widgets/activities";
import { canManageProjectRoles } from "@widgets/projects/details/lib/projectPermissions";

export const Route = createFileRoute("/_masterLayout/projects/$id/roles/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(projectQuery.id(params.id));
  },
  component: ProjectRolesRoute,
});

function ProjectRolesRoute() {
  const { id } = Route.useParams();
  const { t } = useTranslation(["project"]);
  const navigate = useNavigate();
  const { data: project } = useQuery(projectQuery.id(id));

  if (!project || !canManageProjectRoles(project)) {
    return null;
  }

  return (
    <EntityRolesPage
      entityType="project"
      entityId={id}
      eyebrow={t("rolesPage.eyebrow")}
      title={t("rolesPage.title", { name: project.title })}
      subtitle={t("rolesPage.subtitle")}
      backLabel={t("rolesPage.back")}
      loadingLabel={t("rolesPage.loading")}
      errorLabel={t("rolesPage.error")}
      emptyLabel={t("rolesPage.empty")}
      onBack={() => void navigate({ to: "/projects/$id", params: { id } })}
    />
  );
}
