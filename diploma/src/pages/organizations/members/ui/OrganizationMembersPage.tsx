import { useTranslation } from "react-i18next";
import { useOrganizationMembersPage } from "../model/useOrganizationMembersPage";
import { MembersConfirmationModals } from "./members-page/MembersConfirmationModals";
import { MembersContent } from "./members-page/MembersContent";
import { MembersControls } from "./members-page/MembersControls";
import { MembersStats } from "./members-page/MembersStats";
import {
  ManagementPageLayout,
  ManagementTopRow,
} from "@shared/ui/management-page-shell";
import styles from "./OrganizationMembersPage.module.scss";

const PageState = ({ children }: { children: string }) => (
  <ManagementPageLayout>
    <div className={styles.statePanel}>{children}</div>
  </ManagementPageLayout>
);

export const OrganizationMembersPage = () => {
  const { t } = useTranslation("organizations");
  const model = useOrganizationMembersPage();

  if (model.isOrganizationPending) {
    return <PageState>{t("members.loading")}</PageState>;
  }

  if (model.isOrganizationError || !model.organization) {
    return (
      <PageState>{t("members.organizationError")}</PageState>
    );
  }

  if (!model.isOwner && model.isEditAccessLoading) {
    return <PageState>{t("members.checkingAccess")}</PageState>;
  }

  if (!model.isOwner && !model.canEdit) {
    return <PageState>{t("members.redirecting")}</PageState>;
  }

  if (model.isMembersError) {
    return (
      <PageState>
        {t("members.membersError")}
      </PageState>
    );
  }

  return (
    <ManagementPageLayout>
      <div className={styles.content}>
        <ManagementTopRow
          contextName={model.organization.name}
          title={t("members.shortTitle")}
          onBack={model.handleBack}
        />
        <MembersStats model={model} />
        <MembersControls model={model} />
        <MembersContent model={model} />
      </div>

      <MembersConfirmationModals model={model} />
    </ManagementPageLayout>
  );
};
