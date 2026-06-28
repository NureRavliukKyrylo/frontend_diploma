import { eventQuery } from "@entities/event";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { EntityRolesPage } from "@widgets/activities";
import { canManageEventRoles } from "@widgets/events/details/lib/eventPermissions";

export const Route = createFileRoute("/_masterLayout/events/$id/roles/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(eventQuery.id(params.id));
  },
  component: EventRolesRoute,
});

function EventRolesRoute() {
  const { id } = Route.useParams();
  const { t } = useTranslation(["event"]);
  const navigate = useNavigate();
  const { data: event } = useQuery(eventQuery.id(id));

  if (!event || !canManageEventRoles(event)) {
    return null;
  }

  return (
    <EntityRolesPage
      entityType="event"
      entityId={id}
      eyebrow={t("rolesPage.eyebrow")}
      title={t("rolesPage.title", { name: event.title })}
      subtitle={t("rolesPage.subtitle")}
      backLabel={t("rolesPage.back")}
      loadingLabel={t("rolesPage.loading")}
      errorLabel={t("rolesPage.error")}
      emptyLabel={t("rolesPage.empty")}
      onBack={() => void navigate({ to: "/events/$id", params: { id } })}
    />
  );
}
