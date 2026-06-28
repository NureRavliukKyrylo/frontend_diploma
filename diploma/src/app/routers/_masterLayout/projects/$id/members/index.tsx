import { projectQuery } from "@entities/project";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { EntityMembersPage } from "@widgets/activities";
import { canManageProjectMembers } from "@widgets/projects/details/lib/projectPermissions";

export const Route = createFileRoute("/_masterLayout/projects/$id/members/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(projectQuery.id(params.id));
  },
  component: ProjectMembersRoute,
});

function ProjectMembersRoute() {
  const { id } = Route.useParams();
  const { t } = useTranslation(["project", "common"]);
  const navigate = useNavigate();
  const { data: project } = useQuery(projectQuery.id(id));

  if (!project) {
    return null;
  }

  return (
    <EntityMembersPage
      entityType="project"
      entityId={id}
      eyebrow={t("membersPage.eyebrow")}
      title={t("membersPage.title", { name: project.title })}
      subtitle={t("membersPage.subtitle")}
      backLabel={t("membersPage.back")}
      canManage={canManageProjectMembers(project)}
      labels={{
        loading: t("common:entityMembers.loading"),
        error: t("common:entityMembers.error"),
        empty: t("common:entityMembers.empty"),
        confirmRemoveTitle: t("common:entityMembers.confirmRemoveTitle"),
        confirmRemoveText: t("common:entityMembers.confirmRemoveText"),
        confirmRemove: t("common:entityMembers.confirmRemove"),
        cancel: t("common:entityMembers.cancel"),
        roleUpdated: t("common:entityMembers.roleUpdated"),
        roleUpdateFailed: t("common:entityMembers.roleUpdateFailed"),
        memberRemoved: t("common:entityMembers.memberRemoved"),
        memberRemoveFailed: t("common:entityMembers.memberRemoveFailed"),
        missingParticipation: t("common:entityMembers.missingParticipation"),
      }}
      onBack={() => void navigate({ to: "/projects/$id", params: { id } })}
    />
  );
}
