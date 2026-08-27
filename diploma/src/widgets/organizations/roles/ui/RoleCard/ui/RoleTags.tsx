import { Check } from "lucide-react";
import type { ContextRoleCardType } from "../../../config/rolePresentation";
import styles from "../RoleCard.module.scss";
import { useTranslation } from "react-i18next";

interface RoleTagsProps {
  type: ContextRoleCardType;
  isDefaultForJoin: boolean;
}

export const RoleTags = ({ type, isDefaultForJoin }: RoleTagsProps) => {
  const { t } = useTranslation("roles");

  return (
    <div className={styles.tags}>
      {type === "system" ? (
        <span className={`${styles.tag} ${styles.systemTag}`}>
          {t("tags.system")}
        </span>
      ) : null}
      {type === "template" ? (
        <span className={`${styles.tag} ${styles.templateTag}`}>
          {t("tags.template")}
        </span>
      ) : null}
      {isDefaultForJoin ? (
        <span className={`${styles.tag} ${styles.defaultTag}`}>
          <Check size={13} strokeWidth={2.8} />
          {type === "custom" ? t("tags.default") : t("tags.autoAssign")}
        </span>
      ) : null}
    </div>
  );
};
