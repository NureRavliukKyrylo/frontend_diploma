import { getRoleErrorStatus } from "@pages/organizations/roles/lib/roleErrorHandlers";
import { RoleSections } from "@pages/organizations/roles/ui/roles-page/RoleSections";
import { RolesOverlays } from "@pages/organizations/roles/ui/roles-page/RolesOverlays";
import { RolesTabs } from "@pages/organizations/roles/ui/roles-page/RolesTabs";
import { ProjectFab } from "@widgets/projects";
import { useProjectRolesPage } from "../model/useProjectRolesPage";
import { ProjectRolesTopBar } from "./roles-page/ProjectRolesTopBar";
import styles from "./ProjectRolesPage.module.scss";
import { useTranslation } from "react-i18next";

const PageState = ({ children }: { children: string }) => (
  <div className={styles.page}>
    <div className={styles.statePanel}>{children}</div>
  </div>
);

export const ProjectRolesPage = () => {
  const { t } = useTranslation(["roles", "project"]);
  const model = useProjectRolesPage();

  if (model.isProjectPending) {
    return <PageState>{t("project:rolesPage.loading")}</PageState>;
  }

  if (model.isProjectError || !model.project) {
    return <PageState>{t("project:rolesPage.error")}</PageState>;
  }

  if (model.isEditAccessLoading) {
    return <PageState>{t("project:rolesPage.checkingAccess")}</PageState>;
  }

  if (!model.canEdit) {
    return <PageState>{t("project:rolesPage.redirecting")}</PageState>;
  }

  if (
    model.activeRolesResult.isPending ||
    model.templatesResult.isPending
  ) {
    return <PageState>{t("project:rolesPage.loading")}</PageState>;
  }

  if (
    model.activeRolesResult.isError &&
    getRoleErrorStatus(model.activeRolesResult.error) !== 403
  ) {
    return <PageState>{t("project:rolesPage.error")}</PageState>;
  }

  return (
    <>
      <div className={styles.page}>
        <ProjectRolesTopBar model={model} />
        <RolesTabs model={model} />
        <RoleSections model={model} />
      </div>
      <RolesOverlays model={model} />
      <ProjectFab
        projectId={model.project.id}
        project={model.project}
        activeTab={undefined}
        onTabChange={undefined}
      />
    </>
  );
};
