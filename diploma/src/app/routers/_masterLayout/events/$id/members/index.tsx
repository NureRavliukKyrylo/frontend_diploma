import { eventQuery } from "@entities/event";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { EntityMembersPage } from "@widgets/activities";
import { canManageEventMembers } from "@widgets/events/details/lib/eventPermissions";

export const Route = createFileRoute("/_masterLayout/events/$id/members/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(eventQuery.id(params.id));
  },
  component: EventMembersRoute,
});

function EventMembersRoute() {
  const { id } = Route.useParams();
  const { t } = useTranslation(["event", "common"]);
  const navigate = useNavigate();
  const { data: event } = useQuery(eventQuery.id(id));

  if (!event) {
    return null;
  }

  return (
    <EntityMembersPage
      entityType="event"
      entityId={id}
      eyebrow={t("membersPage.eyebrow")}
      title={t("membersPage.title", { name: event.title })}
      subtitle={t("membersPage.subtitle")}
      backLabel={t("membersPage.back")}
      canManage={canManageEventMembers(event)}
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
      onBack={() => void navigate({ to: "/events/$id", params: { id } })}
    />
  );
}
