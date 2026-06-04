import styles from "./TimeBankPage.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import type { TimeBankMode } from "../config/TimeBankMode";
import { timeBankSearchDefaults } from "../libs/timeBankSearchShema";
import { ActivitiesContent } from "../config/tabsForms";

const TABS: { label: string; value: TimeBankMode }[] = [
  { label: "Offers", value: "offers" },
  { label: "My Booking", value: "bookings" },
  { label: "My Offers", value: "my-offers" },
];

export const TimeBankPage = () => {
  const search = useSearch({ from: "/_masterLayout/time-bank/" });
  const navigate = useNavigate({ from: "/time-bank/" });

  const activeTab = search.tab;
  const handleTabChange = (tab: TimeBankMode) => {
    navigate({ search: timeBankSearchDefaults[tab], resetScroll: false });
  };

  return (
    <div className={styles.activitiesWrapper}>
      <nav className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.tab} ${activeTab === tab.value ? styles.activeTab : ""}`}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.label}
            {activeTab === tab.value && (
              <motion.div
                className={styles.tabUnderline}
                layoutId="tabUnderline"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>

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
    </div>
  );
};
