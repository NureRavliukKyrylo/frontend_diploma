import { Check } from "lucide-react";
import styles from "./RoleFormModal.module.scss";

interface PermissionGroup {
  title: string;
  permissions: Array<{
    code: string;
    label: string;
    checked: boolean;
  }>;
}

interface RolePermissionGroupsProps {
  groups: PermissionGroup[];
  selectedCountLabel: string;
  error?: string;
  onToggle: (permission: string) => void;
}

export const RolePermissionGroups = ({
  groups,
  selectedCountLabel,
  error,
  onToggle,
}: RolePermissionGroupsProps) => (
  <section className={styles.permissionsBlock}>
    <div className={styles.permissionsHeader}>
      <h3>Permissions</h3>
      <span className={styles.permissionsCount}>{selectedCountLabel}</span>
    </div>

    {groups.map((group) => (
      <div key={group.title} className={styles.permissionGroup}>
        <h4>{group.title}</h4>
        <div className={styles.permissionGrid}>
          {group.permissions.map(({ code, label, checked }) => (
            <label
              key={code}
              className={`${styles.permissionOption} ${
                checked ? styles.permissionOptionChecked : ""
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(code)}
              />
              <span className={styles.customCheckbox}>
                {checked ? <Check size={10} strokeWidth={3} /> : null}
              </span>
              <span className={styles.permissionText}>
                <strong>{label}</strong>
                <span>{code}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    ))}

    {error ? <span className={styles.error}>{error}</span> : null}
  </section>
);
