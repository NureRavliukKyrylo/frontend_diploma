import {
  tabOptions,
  type RequestsTab,
} from "@widgets/admin/requests/requests-config/libs/requestTypeConfig";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface RequestsTabsProps {
  activeTab: RequestsTab;
  counts: Record<RequestsTab, number>;
  onSelect: (tab: RequestsTab) => void;
}

export const RequestsTabs = ({
  activeTab,
  counts,
  onSelect,
}: RequestsTabsProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.tabsRow}>
      {tabOptions.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            className={`${styles.tab} ${
              isActive ? styles.tabActive : styles.tabInactive
            }`}
            onClick={() => onSelect(tab.value)}
          >
            {t(tab.label)}
            <span className={styles.tabCount}>{counts[tab.value] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
};
