import { useMemo, useState } from "react";
import { LockOpen, Search, Shield, X } from "lucide-react";
import type { ContextRoleDto } from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import { Avatar } from "@shared/ui";
import styles from "./RoleAssigneePicker.module.scss";

interface RoleAssigneePickerProps {
  label: string;
  values: string[];
  members: ParticipationListItem[];
  roles: ContextRoleDto[];
  currentRoleId?: string | null;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}

type PickerResult =
  | { type: "person"; value: string; label: string; avatarUrl?: string | null }
  | { type: "role"; value: string; label: string };

const getMemberName = (member: ParticipationListItem) =>
  [member.firstName, member.lastName].filter(Boolean).join(" ").trim() ||
  "Team member";

export const RoleAssigneePicker = ({
  label,
  values,
  members,
  roles,
  currentRoleId,
  onAdd,
  onRemove,
}: RoleAssigneePickerProps) => {
  const [query, setQuery] = useState("");
  const memberResults = useMemo(
    () =>
      members.map<PickerResult>((member) => ({
        type: "person",
        value: member.userId,
        label: getMemberName(member),
        avatarUrl: member.avatarUrl,
      })),
    [members],
  );
  const roleResults = useMemo(
    () =>
      roles
        .filter((role) => role.id !== currentRoleId)
        .map<PickerResult>((role) => ({
          type: "role",
          value: role.name,
          label: role.name,
        })),
    [currentRoleId, roles],
  );
  const allResults = useMemo(
    () => [...memberResults, ...roleResults],
    [memberResults, roleResults],
  );
  const selectedEntries = values.map((value) => {
    const resolved =
      allResults.find((result) => result.value === value) ??
      roleResults.find((result) => result.type === "role" && result.label === value);
    return resolved ?? ({ type: "role", value, label: value } as PickerResult);
  });
  const filteredResults = allResults
    .filter((result) => !values.includes(result.value))
    .filter((result) =>
      query.trim()
        ? result.label.toLowerCase().includes(query.trim().toLowerCase())
        : true,
    )
    .slice(0, 8);

  return (
    <div className={styles.pickerBlock}>
      <label className={styles.pickerLabel}>{label}</label>
      <div className={styles.pickerBox}>
        {selectedEntries.length > 0 ? (
          <div className={styles.chips}>
            {selectedEntries.map((entry) => (
              <span
                key={`${entry.type}-${entry.value}`}
                className={`${styles.chip} ${
                  entry.type === "person" ? styles.personChip : styles.roleChip
                }`}
              >
                {entry.type === "person" ? (
                  <Avatar
                    src={entry.avatarUrl || undefined}
                    fallback={entry.label}
                    variant={entry.avatarUrl ? "default" : "initials"}
                    className={styles.chipAvatar}
                    initialsClassName={styles.chipInitials}
                  />
                ) : (
                  <span className={styles.chipIcon}>
                    <Shield size={11} strokeWidth={2.6} />
                  </span>
                )}
                {entry.label}
                <button
                  type="button"
                  className={styles.removeChip}
                  aria-label={`Remove ${entry.label}`}
                  onClick={() => onRemove(entry.value)}
                >
                  <X size={12} strokeWidth={2.8} />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.emptyAssignment}>
            <LockOpen size={15} strokeWidth={2.4} />
            Open — anyone with manage permission
          </div>
        )}
        <div className={styles.searchRow}>
          <Search size={15} strokeWidth={2.4} />
          <input
            value={query}
            placeholder="Search people or roles"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className={styles.resultsMenu}>
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <button
                key={`${result.type}-${result.value}`}
                type="button"
                className={styles.resultRow}
                onClick={() => {
                  onAdd(result.value);
                  setQuery("");
                }}
              >
                {result.type === "person" ? (
                  <Avatar
                    src={result.avatarUrl || undefined}
                    fallback={result.label}
                    variant={result.avatarUrl ? "default" : "initials"}
                    className={styles.resultAvatar}
                    initialsClassName={styles.resultInitials}
                  />
                ) : (
                  <span className={styles.resultRoleIcon}>
                    <Shield size={15} strokeWidth={2.5} />
                  </span>
                )}
                <span>{result.label}</span>
              </button>
            ))
          ) : (
            <span className={styles.noResults}>No matching people or roles</span>
          )}
        </div>
      </div>
    </div>
  );
};
