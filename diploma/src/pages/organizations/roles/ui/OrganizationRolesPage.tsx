import { getRoleErrorStatus } from "../lib/roleErrorHandlers";
import { useOrganizationRolesPage } from "../model/useOrganizationRolesPage";
import { RoleSections } from "./roles-page/RoleSections";
import { RolesOverlays } from "./roles-page/RolesOverlays";
import { RolesTabs } from "./roles-page/RolesTabs";
import { RolesTopBar } from "./roles-page/RolesTopBar";
import styles from "./OrganizationRolesPage.module.scss";
import { useTranslation } from "react-i18next";

const PageState = ({ children }: { children: string }) => (
  <div className={styles.page}>
    <div className={styles.statePanel}>{children}</div>
  </div>
);

export const OrganizationRolesPage = () => {
  const { t } = useTranslation("roles");
  const model = useOrganizationRolesPage();

  if (
    model.isOrganizationPending ||
    model.activeRolesResult.isPending ||
    model.templatesResult.isPending
  ) {
    return <PageState>{t("page.loading")}</PageState>;
  }

  if (model.isOrganizationError || !model.organization) {
    return <PageState>{t("page.organizationError")}</PageState>;
  }

  if (
    model.activeRolesResult.isError &&
    getRoleErrorStatus(model.activeRolesResult.error) !== 403
  ) {
    return <PageState>{t("page.rolesError")}</PageState>;
  }

  return (
    <>
      <div className={styles.page}>
        <RolesTopBar model={model} />
        <RolesTabs model={model} />
        <RoleSections model={model} />
      </div>
      <RolesOverlays model={model} />
    </>
  );
};
