import styles from "./TimeBankPage.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import type { TimeBankMode } from "../config/TimeBankMode";
import { timeBankSearchDefaults } from "../libs/timeBankSearchShema";
import { ActivitiesContent } from "../config/tabsForms";
import { getTimeBankTabs } from "../config/timeBankTabs";
import { prefetchTab, TAB_SKELETON } from "../config/skeletonsPrefetch";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const TimeBankPage = () => {
  const search = useSearch({ from: "/_masterLayout/time-bank/" });
  const navigate = useNavigate({ from: "/time-bank/" });
  const { t } = useTranslation("timeBank");
  const timeBankTabs = getTimeBankTabs(t);
  const activeTab = search.tab;

  const [pendingTab, setPendingTab] = useState<TimeBankMode | null>(null);

  const handleTabChange = async (tab: TimeBankMode) => {
    if (tab === activeTab || pendingTab) return;
    setPendingTab(tab);
    await prefetchTab(tab);
    navigate({ search: timeBankSearchDefaults[tab], resetScroll: false });
    setPendingTab(null);
  };

  const SkeletonComponent = TAB_SKELETON[pendingTab ?? activeTab];

  return (
    <div className={styles.activitiesWrapper}>
      <nav className={styles.tabs}>
        {timeBankTabs.map((tab) => (
          <motion.button
            key={tab.value}
            className={`${styles.tab} ${activeTab === tab.value ? styles.activeTab : ""}`}
            onClick={() => handleTabChange(tab.value)}
            whileHover={{ scale: 1.05, color: "#8c0000" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {tab.label}
            {activeTab === tab.value && (
              <motion.div
                className={styles.tabUnderline}
                layoutId="tabUnderline"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>
      {pendingTab ? (
        <SkeletonComponent />
      ) : (
        <div className={styles.activityInfo}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ActivitiesContent tab={activeTab} search={search} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
