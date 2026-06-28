import { eventQuery } from "@entities/event";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { EventAttendanceManagerPage } from "@widgets/activities";
import { canViewEventAttendance } from "@widgets/events/details/lib/eventPermissions";

export const Route = createFileRoute("/_masterLayout/events/$id/attendance/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(eventQuery.id(params.id));
  },
  component: EventAttendanceRoute,
});

function EventAttendanceRoute() {
  const { id } = Route.useParams();
  const { t } = useTranslation(["event"]);
  const navigate = useNavigate();
  const { data: event } = useQuery(eventQuery.id(id));

  if (!event || !canViewEventAttendance(event)) {
    return null;
  }

  return (
    <EventAttendanceManagerPage
      event={event}
      eventId={id}
      labels={{
        eyebrow: t("attendancePage.eyebrow"),
        title: t("attendancePage.title", { name: event.title }),
        subtitle: t("attendancePage.subtitle"),
        back: t("attendancePage.back"),
        loading: t("attendancePage.loading"),
        error: t("attendancePage.error"),
        empty: t("attendancePage.empty"),
        user: t("attendancePage.table.user"),
        checkIn: t("attendancePage.table.checkIn"),
        checkOut: t("attendancePage.table.checkOut"),
        minutes: t("attendancePage.table.minutes"),
        status: t("attendancePage.table.status"),
        note: t("attendancePage.table.note"),
        actions: t("attendancePage.table.actions"),
        export: t("attendancePage.export"),
        allStatuses: t("attendancePage.filters.allStatuses"),
        approve: t("attendancePage.actions.approve"),
        reject: t("attendancePage.actions.reject"),
        resolve: t("attendancePage.actions.resolve"),
        resolveAsApprove: t("attendancePage.actions.resolveAsApprove"),
        resolveAsReject: t("attendancePage.actions.resolveAsReject"),
        commentPlaceholder: t("attendancePage.modal.commentPlaceholder"),
        modalTitle: t("attendancePage.modal.title"),
        modalText: t("attendancePage.modal.text"),
        confirm: t("attendancePage.modal.confirm"),
        cancel: t("attendancePage.modal.cancel"),
        saved: t("attendancePage.notifications.saved"),
        failed: t("attendancePage.notifications.failed"),
        exported: t("attendancePage.notifications.exported"),
        notProvided: t("attendancePage.table.notProvided"),
      }}
      onBack={() => void navigate({ to: "/events/$id", params: { id } })}
    />
  );
}
