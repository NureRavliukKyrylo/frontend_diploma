import { Check } from "lucide-react";
import type { ContextRoleCardType } from "../../../config/rolePresentation";
import styles from "../RoleCard.module.scss";

interface RoleTagsProps {
  type: ContextRoleCardType;
  isDefaultForJoin: boolean;
}

export const RoleTags = ({ type, isDefaultForJoin }: RoleTagsProps) => (
  <div className={styles.tags}>
    {type === "system" ? (
      <span className={`${styles.tag} ${styles.systemTag}`}>System</span>
    ) : null}
    {type === "template" ? (
      <span className={`${styles.tag} ${styles.templateTag}`}>Template</span>
    ) : null}
    {isDefaultForJoin ? (
      <span className={`${styles.tag} ${styles.defaultTag}`}>
        <Check size={13} strokeWidth={2.8} />
        {type === "custom" ? "Default" : "Auto-assign"}
      </span>
    ) : null}
  </div>
);
