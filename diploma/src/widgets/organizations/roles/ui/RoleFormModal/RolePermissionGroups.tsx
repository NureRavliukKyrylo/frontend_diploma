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
        <span className={styles.permissionGroupLabel}>
          {group.title.replace("Organization", "Org")}:
        </span>
        <div className={styles.permissionPills}>
          {group.permissions.map(({ code, label, checked }) => (
            <button
              key={code}
              type="button"
              className={`${styles.permissionPill} ${
                checked ? styles.permissionPillSelected : ""
              }`}
              onClick={() => onToggle(code)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    ))}

    {error ? <span className={styles.error}>{error}</span> : null}
  </section>
);
