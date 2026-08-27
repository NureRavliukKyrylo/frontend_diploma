import { Crown } from "lucide-react";
import { Avatar } from "@shared/ui";
import type { RoleDrawerMember } from "../types";
import styles from "../RoleDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface MembersSectionProps {
  memberCount: number;
  members: RoleDrawerMember[];
}

export const MembersSection = ({
  memberCount,
  members,
}: MembersSectionProps) => {
  const { t } = useTranslation("roles");

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeadingRow}>
        <h3>{t("drawer.members")}</h3>
        <span>{t("drawer.total", { count: memberCount })}</span>
      </div>

      {members.length > 0 ? (
        <div className={styles.membersList}>
          {members.map((member) => (
            <div key={member.id} className={styles.memberRow}>
              <div className={styles.avatarWrap}>
                <Avatar
                  src={member.avatarUrl || undefined}
                  fallback={member.fullName}
                  variant={member.avatarUrl ? "default" : "initials"}
                  className={styles.avatar}
                  initialsClassName={styles.avatarInitials}
                />
                {member.level ? (
                  <span className={styles.levelBadge}>
                    <Crown size={10} strokeWidth={2.4} />
                    {member.level}
                  </span>
                ) : null}
              </div>
              <div className={styles.memberCopy}>
                <strong>{member.fullName}</strong>
                <span>{member.joinedLabel}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyText}>{t("drawer.noMembers")}</p>
      )}
    </section>
  );
};
