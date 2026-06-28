import { Link } from "@tanstack/react-router";
import { Plus, Wrench } from "lucide-react";

interface CategoriesHeaderActionsProps {
  styles: Record<string, string>;
  onCreate: () => void;
}

export const CategoriesHeaderActions = ({
  styles,
  onCreate,
}: CategoriesHeaderActionsProps) => (
  <div className={styles.headerActions}>
    <Link to="/admin/skills" className={styles.secondaryButton}>
      <Wrench size={17} aria-hidden="true" />
      Manage skills
    </Link>
    <button type="button" className={styles.primaryButton} onClick={onCreate}>
      <Plus size={17} aria-hidden="true" />
      New category
    </button>
  </div>
);
