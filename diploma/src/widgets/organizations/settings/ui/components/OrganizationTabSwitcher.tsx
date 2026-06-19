import { motion } from "framer-motion";
import { tabs, type SettingsTab } from "../config/settingsTabs";
import styles from "../SettingsWidget.module.scss";

interface OrganizationTabSwitcherProps {
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

export const OrganizationTabSwitcher = ({
  activeTab,
  onChange,
}: OrganizationTabSwitcherProps) => (
  <div
    className={styles.tabSwitcher}
    role="tablist"
    aria-label="Organization settings sections"
  >
    {tabs.map((tab) => {
      const isActive = activeTab === tab.value;

      return (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={isActive}
          className={`${styles.tabButton} ${
            isActive ? styles.tabButtonActive : ""
          }`}
          onClick={() => onChange(tab.value)}
        >
          {isActive ? (
            <motion.span
              layoutId="organization-settings-active-tab"
              className={styles.tabPill}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 34,
                mass: 0.8,
              }}
            />
          ) : null}
          <span>{tab.label}</span>
        </button>
      );
    })}
  </div>
);
