import { Link } from "@tanstack/react-router";
import { Plus, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CategoriesHeaderActionsProps {
  styles: Record<string, string>;
  onCreate: () => void;
}

export const CategoriesHeaderActions = ({
  styles,
  onCreate,
}: CategoriesHeaderActionsProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.headerActions}>
      <Link to="/admin/skills" className={styles.secondaryButton}>
        <Wrench size={17} aria-hidden="true" />
        {t("categories.manageSkills")}
      </Link>
      <button type="button" className={styles.primaryButton} onClick={onCreate}>
        <Plus size={17} aria-hidden="true" />
        {t("categories.newCategory")}
      </button>
    </div>
  );
};
