import { Clock3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar } from "@shared/ui";
import { Stars } from "@shared/ui/stars";
import type { OrganizationMemberCardModel } from "../types";
import { getRoleTone } from "./roleTone";
import styles from "../MemberCard.module.scss";

interface MemberCardTopProps {
  member: OrganizationMemberCardModel;
}

export const MemberCardTop = ({ member }: MemberCardTopProps) => {
  const { t } = useTranslation("common");
  const roleTone = getRoleTone(
    member.roleName,
    member.isOwner,
    t("member.ownerLabel"),
  );
  const RoleIcon = roleTone.icon;

  return (
    <div className={styles.topSection}>
      <div className={styles.avatarWrap}>
        <Avatar
          src={member.avatarUrl ?? undefined}
          fallback={member.fullName}
          variant={member.avatarUrl ? "default" : "initials"}
          className={styles.avatar}
          initialsClassName={styles.avatarInitials}
        />
        {typeof member.level === "number" ? (
          <span className={styles.levelBadge}>
            {t("member.level", { level: member.level })}
          </span>
        ) : null}
      </div>

      <h3 className={styles.name}>{member.fullName}</h3>

      <div className={styles.ratingRow}>
        <Stars
          value={member.rating ?? 0}
          className={styles.stars}
          classNameStar={styles.starIcon}
        />
        <span className={styles.ratingValue}>
          {(member.rating ?? 0).toFixed(1)}
        </span>
        <span className={styles.ratingCount}>({member.ratingCount ?? 0})</span>
      </div>

      {typeof member.totalHours === "number" ? (
        <span className={styles.timeBankPill}>
          <Clock3 size={13} strokeWidth={2.2} />
          {t("member.hours", { hours: member.totalHours.toFixed(1) })}
        </span>
      ) : null}

      <span className={`${styles.rolePill} ${roleTone.className}`}>
        <RoleIcon size={13} strokeWidth={2.4} />
        {roleTone.label}
      </span>
    </div>
  );
};
