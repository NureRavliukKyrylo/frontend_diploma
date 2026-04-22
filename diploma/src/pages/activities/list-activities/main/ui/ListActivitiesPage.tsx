import styles from "./ListActivitiesPage.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { myActivitiesSearchDefaults } from "@pages/activities";
import {
  ListActivitiesHeader,
  type ListActivitiesMode,
} from "@widgets/activities";
import { ActivitiesContent } from "../config/activitiesForms";
import { headerVariants } from "@shared/assets/animations";

export const ListActivitiesPage = () => {
  const search = useSearch({ from: "/_masterLayout/activities/" });

  const navigate = useNavigate({ from: "/activities/" });

  const activeTab = search.tab;
  const handleTabChange = (tab: ListActivitiesMode) => {
    navigate({ search: myActivitiesSearchDefaults[tab], resetScroll: false });
  };

  return (
    <div className={styles.activitiesWrapper}>
      <motion.div
        {...headerVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ListActivitiesHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </motion.div>
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
