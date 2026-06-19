import { Check } from "lucide-react";
import { getPermissionLabel } from "../../../config/rolePresentation";
import styles from "../RoleDrawer.module.scss";

interface PermissionsSectionProps {
  permissions: string[];
}

export const PermissionsSection = ({ permissions }: PermissionsSectionProps) => (
  <section className={styles.section}>
    <div className={styles.sectionHeading}>
      <h3>Permissions · {permissions.length}</h3>
      <p>Everything this role can do across the organization scope.</p>
    </div>

    <div className={styles.permissionList}>
      {permissions.map((permission) => (
        <div key={permission} className={styles.permissionItem}>
          <span className={styles.permissionIcon}>
            <Check size={15} strokeWidth={3} />
          </span>
          <div className={styles.permissionCopy}>
            <strong>{getPermissionLabel(permission)}</strong>
            <span>{permission}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);
