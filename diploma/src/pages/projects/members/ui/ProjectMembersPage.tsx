import { useTranslation } from "react-i18next";
import { MembersConfirmationModals } from "@pages/organizations/members/ui/members-page/MembersConfirmationModals";
import { MembersContent } from "@pages/organizations/members/ui/members-page/MembersContent";
import { MembersControls } from "@pages/organizations/members/ui/members-page/MembersControls";
import { MembersStats } from "@pages/organizations/members/ui/members-page/MembersStats";
import {
  ManagementPageLayout,
  ManagementTopRow,
} from "@shared/ui/management-page-shell";
import { ProjectFab } from "@widgets/projects";
import { useProjectMembersPage } from "../model/useProjectMembersPage";
import styles from "./ProjectMembersPage.module.scss";

const PageState = ({ children }: { children: string }) => (
  <ManagementPageLayout>
    <div className={styles.statePanel}>{children}</div>
  </ManagementPageLayout>
);

export const ProjectMembersPage = () => {
  const { t } = useTranslation("project");
  const model = useProjectMembersPage();

  if (model.isProjectPending) {
    return <PageState>{t("membersPage.loading")}</PageState>;
  }

  if (model.isProjectError || !model.project) {
    return <PageState>{t("membersPage.projectError")}</PageState>;
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
            contextName={model.project.title}
            title={t("membersPage.shortTitle")}
            contextLabel={t("meta.chip")}
            onBack={model.handleBack}
          />
          <MembersStats model={model} />
          <MembersControls model={model} />
          <MembersContent model={model} />
        </div>

        <MembersConfirmationModals model={model} />
      </ManagementPageLayout>
      <ProjectFab
        projectId={model.project.id}
        project={model.project}
        activeTab={undefined}
        onTabChange={undefined}
      />
    </>
  );
};
