import { Link } from "@tanstack/react-router";
import { Plus, Tags } from "lucide-react";

interface SkillsHeaderActionsProps {
  styles: Record<string, string>;
  onCreate: () => void;
}

export const SkillsHeaderActions = ({
  styles,
  onCreate,
}: SkillsHeaderActionsProps) => (
  <div className={styles.headerActions}>
    <Link to="/admin/categories" className={styles.secondaryButton}>
      <Tags size={17} aria-hidden="true" />
      Categories
    </Link>
    <button type="button" className={styles.primaryButton} onClick={onCreate}>
      <Plus size={17} aria-hidden="true" />
      New skill
    </button>
  </div>
);
