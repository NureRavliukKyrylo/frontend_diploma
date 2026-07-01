import { ChevronLeft, Plus } from "lucide-react";
import { getOrganizationInitials } from "@pages/organizations/roles/lib/roleViewModels";
import type { ProjectRolesPageModel } from "../../model/pageModel";
import styles from "@pages/organizations/roles/ui/roles-page/RolesTopBar.module.scss";
import { useTranslation } from "react-i18next";

interface ProjectRolesTopBarProps {
  model: ProjectRolesPageModel;
}

export const ProjectRolesTopBar = ({ model }: ProjectRolesTopBarProps) => {
  const { t } = useTranslation(["roles", "project"]);

  return (
    <div className={styles.topBar}>
      <div className={styles.titleGroup}>
        <button
          type="button"
          className={styles.backButton}
          aria-label={t("project:rolesPage.back")}
          onClick={() =>
            model.navigate({
              to: "/projects/$id",
              params: { id: model.projectId },
            })
          }
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        <span className={styles.orgLogo}>
          {model.organization?.logoUrl ? (
            <img
              src={model.organization.logoUrl}
              alt={t("roles:page.logoAlt", {
                name: model.organization.name,
              })}
            />
          ) : (
            <span>
              {getOrganizationInitials(model.organization?.name ?? "")}
            </span>
          )}
        </span>
        <span className={styles.verticalLine} />

        <div className={styles.titleCopy}>
          <span className={styles.organizationCaption}>
            {model.organization?.name}
          </span>
          <div className={styles.titleHeadingRow}>
            <h1 className={styles.pageTitle}>
              {t("project:rolesPage.title", {
                name: model.project?.title,
              })}
            </h1>
            <span className={styles.contextBadge}>
              {t("project:rolesPage.context")}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.newRoleButton}
        onClick={() => model.setFormState({ mode: "create", role: null })}
      >
        <Plus size={15} strokeWidth={2.4} />
        {t("roles:page.newRole")}
      </button>
    </div>
  );
};
