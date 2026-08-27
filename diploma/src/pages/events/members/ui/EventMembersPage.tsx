import { MembersConfirmationModals } from "@pages/organizations/members/ui/members-page/MembersConfirmationModals";
import { MembersContent } from "@pages/organizations/members/ui/members-page/MembersContent";
import { MembersControls } from "@pages/organizations/members/ui/members-page/MembersControls";
import { MembersStats } from "@pages/organizations/members/ui/members-page/MembersStats";
import {
  ManagementPageLayout,
  ManagementTopRow,
} from "@shared/ui/management-page-shell";
import { EventFab } from "@widgets/events";
import { useTranslation } from "react-i18next";
import { useEventMembersPage } from "../model/useEventMembersPage";
import styles from "./EventMembersPage.module.scss";

const PageState = ({ children }: { children: string }) => (
  <ManagementPageLayout>
    <div className={styles.statePanel}>{children}</div>
  </ManagementPageLayout>
);

export const EventMembersPage = () => {
  const { t } = useTranslation("event");
  const model = useEventMembersPage();

  if (model.isEventPending) {
    return <PageState>{t("membersPage.loading")}</PageState>;
  }
  if (model.isEventError || !model.event) {
    return <PageState>{t("membersPage.eventError")}</PageState>;
  }
  if (model.isEditAccessLoading) {
    return <PageState>{t("membersPage.checkingAccess")}</PageState>;
  }
  if (!model.canEdit) {
    return <PageState>{t("membersPage.redirecting")}</PageState>;
  }
  if (model.isMembersError) {
    return <PageState>{t("membersPage.membersError")}</PageState>;
  }

  return (
    <>
      <ManagementPageLayout>
        <div className={styles.content}>
          <ManagementTopRow
            contextName={model.event.title}
            title={t("membersPage.shortTitle")}
            contextLabel={t("rolesPage.context")}
            onBack={model.handleBack}
          />
          <MembersStats model={model} />
          <MembersControls model={model} />
          <MembersContent model={model} />
        </div>

        <MembersConfirmationModals model={model} />
      </ManagementPageLayout>
      <EventFab
        eventId={model.event.id}
        event={model.event}
        activeTab={undefined}
        onTabChange={undefined}
      />
    </>
  );
};
