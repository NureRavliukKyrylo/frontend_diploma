import type { OrganizationRolesPageModel } from "../../model/pageModel";
import styles from "./RolesTabs.module.scss";

interface RolesTabsProps {
  model: OrganizationRolesPageModel;
}

export const RolesTabs = ({ model }: RolesTabsProps) => (
  <div className={styles.tabsContainer}>
    <button
      type="button"
      className={`${styles.tabButton} ${
        model.activeTab === "active" ? styles.tabButtonActive : ""
      }`}
      onClick={() => model.setActiveTab("active")}
    >
      Active roles
    </button>
    <button
      type="button"
      className={`${styles.tabButton} ${
        model.activeTab === "archived" ? styles.tabButtonActive : ""
      }`}
      onClick={() => model.setActiveTab("archived")}
    >
      Archived
      <span
        className={`${styles.tabBadge} ${
          model.activeTab === "archived" ? styles.tabBadgeActive : ""
        }`}
      >
        {model.archivedRoles.length}
      </span>
    </button>
  </div>
);
