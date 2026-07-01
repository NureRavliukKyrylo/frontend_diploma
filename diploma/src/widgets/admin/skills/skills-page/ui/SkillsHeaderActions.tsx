import { Link } from "@tanstack/react-router";
import { Plus, Tags } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SkillsHeaderActionsProps {
  styles: Record<string, string>;
  onCreate: () => void;
}

export const SkillsHeaderActions = ({
  styles,
  onCreate,
}: SkillsHeaderActionsProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.headerActions}>
      <Link to="/admin/categories" className={styles.secondaryButton}>
        <Tags size={17} aria-hidden="true" />
        {t("skills.categories")}
      </Link>
      <button type="button" className={styles.primaryButton} onClick={onCreate}>
        <Plus size={17} aria-hidden="true" />
        {t("skills.newSkill")}
      </button>
    </div>
  );
};
