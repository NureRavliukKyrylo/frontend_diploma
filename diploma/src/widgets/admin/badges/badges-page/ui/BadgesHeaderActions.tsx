import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BadgesHeaderActionsProps {
  styles: Record<string, string>;
  onCreate: () => void;
}

export const BadgesHeaderActions = ({
  styles,
  onCreate,
}: BadgesHeaderActionsProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.headerActions}>
      <button type="button" className={styles.primaryButton} onClick={onCreate}>
        <Plus size={17} aria-hidden="true" />
        {t("badges.newBadge")}
      </button>
    </div>
  );
};
