import {
  contextRolePermissionGroups,
  getPermissionLabel,
} from "../../../config/rolePresentation";
import styles from "../RoleDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface PermissionsSectionProps {
  permissions: string[];
}

export const PermissionsSection = ({
  permissions,
}: PermissionsSectionProps) => {
  const { t } = useTranslation("roles");
  const knownPermissions = new Set(
    contextRolePermissionGroups.flatMap((group) => group.permissions),
  );
  const groupedPermissions = contextRolePermissionGroups
    .map((group) => ({
      title: t(group.title),
      permissions: group.permissions.filter((permission) =>
        permissions.includes(permission),
      ),
    }))
    .filter((group) => group.permissions.length > 0);
  const customPermissions = permissions.filter(
    (permission) => !knownPermissions.has(permission),
  );

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeadingRow}>
        <h3>{t("drawer.permissions")}</h3>
        <span>{t("drawer.total", { count: permissions.length })}</span>
      </div>

      <div className={styles.permissionGroups}>
        {groupedPermissions.map((group) => (
          <div key={group.title} className={styles.permissionGroup}>
            <span className={styles.permissionGroupLabel}>{group.title}:</span>
            <div className={styles.permissionPills}>
              {group.permissions.map((permission) => (
                <span key={permission} className={styles.permissionPill}>
                  {getPermissionLabel(permission, t)}
                </span>
              ))}
            </div>
          </div>
        ))}
        {customPermissions.length > 0 ? (
          <div className={styles.permissionGroup}>
            <span className={styles.permissionGroupLabel}>
              {t("drawer.other")}:
            </span>
            <div className={styles.permissionPills}>
              {customPermissions.map((permission) => (
                <span key={permission} className={styles.permissionPill}>
                  {getPermissionLabel(permission, t)}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
