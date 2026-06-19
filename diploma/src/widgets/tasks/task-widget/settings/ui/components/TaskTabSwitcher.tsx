import { motion } from "framer-motion";
import { tabs, type ActiveTab } from "../config/settingsTabs";
import styles from "../TaskEditSettings.module.scss";

interface TaskTabSwitcherProps {
  activeTab: ActiveTab;
  onChange: (tab: ActiveTab) => void;
}

export const TaskTabSwitcher = ({
  activeTab,
  onChange,
}: TaskTabSwitcherProps) => (
  <div className={styles.tabSwitcher}>
    {tabs.map((tab) => {
      const isActive = activeTab === tab.id;

      return (
        <button
          key={tab.id}
          type="button"
          className={`${styles.tabButton} ${
            isActive ? styles.tabButtonActive : ""
          }`}
          onClick={() => onChange(tab.id)}
        >
          {isActive ? (
            <motion.span
              className={styles.tabPill}
              layoutId="task-settings-active-tab"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          ) : null}
          <span>{tab.label}</span>
        </button>
      );
    })}
  </div>
);
