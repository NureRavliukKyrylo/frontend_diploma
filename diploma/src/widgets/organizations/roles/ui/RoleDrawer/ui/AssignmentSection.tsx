import { Shield } from "lucide-react";
import type { ContextRoleDto } from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import { Avatar } from "@shared/ui";
import styles from "../RoleDrawer.module.scss";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

interface AssignmentSectionProps {
  assignableBy: string[];
  approvableBy: string[];
  members: ParticipationListItem[];
  roles: ContextRoleDto[];
  currentRoleId?: string | null;
}

type AssignmentEntry =
  | { type: "person"; value: string; label: string; avatarUrl?: string | null }
  | { type: "role"; value: string; label: string };

const getMemberName = (member: ParticipationListItem, t: TFunction) =>
  [member.firstName, member.lastName].filter(Boolean).join(" ").trim() ||
  t("roles:members.teamMember");

const resolveEntries = (
  values: string[],
  members: ParticipationListItem[],
  roles: ContextRoleDto[],
  t: TFunction,
  currentRoleId?: string | null,
) =>
  values.map((value): AssignmentEntry => {
    const member = members.find((item) => item.userId === value);
    if (member) {
      return {
        type: "person",
        value,
        label: getMemberName(member, t),
        avatarUrl: member.avatarUrl,
      };
    }

    const role = roles.find(
      (item) =>
        item.id !== currentRoleId && (item.name === value || item.id === value),
    );

    return {
      type: "role",
      value,
      label: role?.name ?? value,
    };
  });

export const AssignmentSection = ({
  assignableBy,
  approvableBy,
  members,
  roles,
  currentRoleId,
}: AssignmentSectionProps) => {
  const { t } = useTranslation("roles");
  const assignableEntries = resolveEntries(
    assignableBy,
    members,
    roles,
    t,
    currentRoleId,
  );
  const approvableEntries = resolveEntries(
    approvableBy,
    members,
    roles,
    t,
    currentRoleId,
  );

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeadingRow}>
        <h3>{t("drawer.assignment")}</h3>
      </div>
      <div className={styles.assignmentRows}>
        <AssignmentRow
          label={t("drawer.assignableBy")}
          entries={assignableEntries}
          emptyLabel={t("drawer.anyone")}
        />
        <AssignmentRow
          label={t("drawer.approvableBy")}
          entries={approvableEntries}
          emptyLabel={t("drawer.anyone")}
        />
      </div>
    </section>
  );
};

const AssignmentRow = ({
  label,
  entries,
  emptyLabel,
}: {
  label: string;
  entries: AssignmentEntry[];
  emptyLabel: string;
}) => (
  <div className={styles.assignmentRow}>
    <span className={styles.assignmentLabel}>{label}</span>
    {entries.length > 0 ? (
      <div className={styles.assignmentChips}>
        {entries.map((entry) => (
          <span
            key={`${entry.type}-${entry.value}`}
            className={`${styles.assignmentChip} ${
              entry.type === "person"
                ? styles.assignmentPersonChip
                : styles.assignmentRoleChip
            }`}
          >
            {entry.type === "person" ? (
              <Avatar
                src={entry.avatarUrl || undefined}
                fallback={entry.label}
                variant={entry.avatarUrl ? "default" : "initials"}
                className={styles.assignmentAvatar}
                initialsClassName={styles.assignmentInitials}
              />
            ) : (
              <span className={styles.assignmentRoleIcon}>
                <Shield size={11} strokeWidth={2.5} />
              </span>
            )}
            {entry.label}
          </span>
        ))}
      </div>
    ) : (
      <span className={styles.assignmentOpen}>{emptyLabel}</span>
    )}
  </div>
);
