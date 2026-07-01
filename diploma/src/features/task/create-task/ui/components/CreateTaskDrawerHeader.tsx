import styles from "../CreateTaskDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface CreateTaskDrawerHeaderProps {
  orgName?: string;
  onClose: () => void;
}

export const CreateTaskDrawerHeader = ({
  orgName,
  onClose,
}: CreateTaskDrawerHeaderProps) => {
  const { t } = useTranslation("task");
  const resolvedOrgName = orgName?.trim() || t("create.organization");

  return (
    <header className={styles.drawerHeader}>
      <div>
        <h1 className={styles.drawerTitle}>{t("create.newTask")}</h1>
        <p className={styles.drawerSubtitle}>
          {t("create.creatingIn", { name: resolvedOrgName })}
        </p>
      </div>
      <button
        type="button"
        className={styles.closeBtn}
        aria-label={t("create.close")}
        onClick={onClose}
      >
        <i className="ti ti-x" aria-hidden="true" />
      </button>
    </header>
  );
};
