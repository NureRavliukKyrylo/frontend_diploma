import { SortDropDown } from "@shared/ui/drop-down";
import { getSortingRoleItems } from "../../lib/sortingRoleItems";
import type { OrganizationRolesPageModel } from "../../model/pageModel";
import styles from "./RolesTabs.module.scss";

interface RolesTabsProps {
  model: OrganizationRolesPageModel;
}

export const RolesTabs = ({ model }: RolesTabsProps) => {
  return (
    <div className={styles.controlsRow}>
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

      <div className={styles.sortControl}>
        <SortDropDown
          options={getSortingRoleItems()}
          value={model.roleSort}
          onSelect={model.setRoleSort}
          selectedLabelOnly
          fitTriggerToWidestOption
        />
      </div>
    </div>
  );
};
