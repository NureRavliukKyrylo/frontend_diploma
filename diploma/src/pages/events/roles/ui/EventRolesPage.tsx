import { getRoleErrorStatus } from "@pages/organizations/roles/lib/roleErrorHandlers";
import { RoleSections } from "@pages/organizations/roles/ui/roles-page/RoleSections";
import { RolesOverlays } from "@pages/organizations/roles/ui/roles-page/RolesOverlays";
import { RolesTabs } from "@pages/organizations/roles/ui/roles-page/RolesTabs";
import { EventFab } from "@widgets/events";
import { useEventRolesPage } from "../model/useEventRolesPage";
import { EventRolesTopBar } from "./roles-page/EventRolesTopBar";
import styles from "./EventRolesPage.module.scss";
import { useTranslation } from "react-i18next";

const PageState = ({ children }: { children: string }) => (
  <div className={styles.page}>
    <div className={styles.statePanel}>{children}</div>
  </div>
);

export const EventRolesPage = () => {
  const { t } = useTranslation(["roles", "event"]);
  const model = useEventRolesPage();

  if (model.isEventPending) {
    return <PageState>{t("event:rolesPage.loading")}</PageState>;
  }
  if (model.isEventError || !model.event) {
    return <PageState>{t("event:rolesPage.error")}</PageState>;
  }
  if (model.isEditAccessLoading) {
    return <PageState>{t("event:rolesPage.checkingAccess")}</PageState>;
  }
  if (!model.canEdit) {
    return <PageState>{t("event:rolesPage.redirecting")}</PageState>;
  }
  if (
    model.activeRolesResult.isPending ||
    model.templatesResult.isPending
  ) {
    return <PageState>{t("event:rolesPage.loading")}</PageState>;
  }
  if (
    model.activeRolesResult.isError &&
    getRoleErrorStatus(model.activeRolesResult.error) !== 403
  ) {
    return <PageState>{t("event:rolesPage.error")}</PageState>;
  }

  return (
    <>
      <div className={styles.page}>
        <EventRolesTopBar model={model} />
        <RolesTabs model={model} />
        <RoleSections model={model} />
      </div>
      <RolesOverlays model={model} />
      <EventFab
        eventId={model.event.id}
        event={model.event}
        activeTab={undefined}
        onTabChange={undefined}
      />
    </>
  );
};
