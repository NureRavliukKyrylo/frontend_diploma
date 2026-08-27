import { ChevronLeft, Plus } from "lucide-react";
import { getOrganizationInitials } from "../../lib/roleViewModels";
import type { OrganizationRolesPageModel } from "../../model/pageModel";
import styles from "./RolesTopBar.module.scss";
import { useTranslation } from "react-i18next";

interface RolesTopBarProps {
  model: OrganizationRolesPageModel;
}

export const RolesTopBar = ({ model }: RolesTopBarProps) => {
  const { t } = useTranslation("roles");

  return (
    <div className={styles.topBar}>
      <div className={styles.titleGroup}>
        <button
          type="button"
          className={styles.backButton}
          aria-label={t("page.back")}
          onClick={() =>
            model.navigate({
              to: "/organizations/$id",
              params: { id: model.organizationId },
            })
          }
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        <span className={styles.orgLogo}>
          {model.organization?.logoUrl ? (
            <img
              src={model.organization.logoUrl}
              alt={t("page.logoAlt", { name: model.organization.name })}
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
          <h1 className={styles.pageTitle}>{t("page.title")}</h1>
        </div>
      </div>

      <button
        type="button"
        className={styles.newRoleButton}
        onClick={() => model.setFormState({ mode: "create", role: null })}
      >
        <Plus size={15} strokeWidth={2.4} />
        {t("page.newRole")}
      </button>
    </div>
  );
};
