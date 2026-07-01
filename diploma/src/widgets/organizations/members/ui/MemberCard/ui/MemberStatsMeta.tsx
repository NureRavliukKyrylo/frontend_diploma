import { CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrganizationMemberCardModel } from "../types";
import styles from "../MemberCard.module.scss";

interface MemberStatsMetaProps {
  member: OrganizationMemberCardModel;
}

export const MemberStatsMeta = ({ member }: MemberStatsMetaProps) => {
  const { t } = useTranslation("common");

  return (
    <>
    <div className={styles.statsGrid}>
      <div className={styles.statBlock}>
        <strong>{member.primaryStatValue}</strong>
        <span>{t("member.completedProjects")}</span>
      </div>
      <div className={styles.statBlock}>
        <strong>{member.secondaryStatValue}</strong>
        <span>{t("member.activeProjects")}</span>
      </div>
    </div>

    <div className={styles.metaSection}>
      <span className={styles.metaLabel}>
        <CalendarDays size={13} strokeWidth={2.2} />
        {member.joinedAtLabel ?? t("member.joinDateUnavailable")}
      </span>
    </div>
    </>
  );
};
