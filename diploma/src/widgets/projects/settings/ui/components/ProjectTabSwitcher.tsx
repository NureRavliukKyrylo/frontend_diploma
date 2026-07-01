import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { tabs, type ActiveTab } from "../config/settingsTabs";
import styles from "../SettingsWidget.module.scss";

interface ProjectTabSwitcherProps {
  activeTab: ActiveTab;
  onChange: (tab: ActiveTab) => void;
}

export const ProjectTabSwitcher = ({
  activeTab,
  onChange,
}: ProjectTabSwitcherProps) => {
  const { t } = useTranslation("project");

  return (
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
              layoutId="project-settings-active-tab"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          ) : null}
          <span>{t(tab.labelKey)}</span>
        </button>
      );
    })}
    </div>
  );
};
