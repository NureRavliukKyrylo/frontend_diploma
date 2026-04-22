import { useQuery } from "@tanstack/react-query";
import styles from "./MyActivitiesPage.module.scss";
import { profileQuery } from "@entities/user/profile";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { MyActivitiesContent } from "../config/myActivitiesForms";
import { AnimatePresence, motion } from "framer-motion";
import { myActivitiesSearchDefaults } from "@pages/activities";
import { MyActivitiesHeader, type MyActivitiesMode } from "@widgets/activities";

export const MyActivitiesPage = () => {
  const { data: user } = useQuery(profileQuery.all());
  const search = useSearch({ from: "/_masterLayout/activities/my/" });

  const navigate = useNavigate({ from: "/activities/my/" });

  const activeTab = search.tab;
  const handleTabChange = (tab: MyActivitiesMode) => {
    navigate({ search: myActivitiesSearchDefaults[tab] });
  };

  return (
    <div className={styles.myProjectsWrapper}>
      <div className={styles.userInfo}>
        {user && (
          <MyActivitiesHeader
            activeTab={activeTab}
            onTabChange={handleTabChange}
            user={user}
          />
        )}
      </div>
      <div className={styles.activityInfo}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <MyActivitiesContent tab={activeTab} search={search} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
