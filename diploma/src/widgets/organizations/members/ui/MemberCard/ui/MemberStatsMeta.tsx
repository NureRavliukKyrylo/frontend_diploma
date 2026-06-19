import { CalendarDays } from "lucide-react";
import type { OrganizationMemberCardModel } from "../types";
import styles from "../MemberCard.module.scss";

interface MemberStatsMetaProps {
  member: OrganizationMemberCardModel;
}

export const MemberStatsMeta = ({ member }: MemberStatsMetaProps) => (
  <>
    <div className={styles.statsGrid}>
      <div className={styles.statBlock}>
        <strong>{member.primaryStatValue}</strong>
        <span>{member.primaryStatLabel}</span>
      </div>
      <div className={styles.statBlock}>
        <strong>{member.secondaryStatValue}</strong>
        <span>{member.secondaryStatLabel}</span>
      </div>
    </div>

    <div className={styles.metaSection}>
      <span className={styles.metaLabel}>
        <CalendarDays size={13} strokeWidth={2.2} />
        {member.joinedAtLabel ?? "Join date unavailable"}
      </span>
    </div>
  </>
);
