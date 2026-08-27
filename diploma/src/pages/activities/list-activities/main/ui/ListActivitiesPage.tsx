import styles from "./ListActivitiesPage.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { listActivitiesSearchDefaults } from "@pages/activities";
import { ListActivitiesHeader } from "@widgets/activities";
import { ActivitiesContent } from "../config/activitiesForms";
import { headerVariants } from "@shared/assets/animations";
import type {
  BaseFiltersRoute,
  ListActivitiesMode,
} from "@shared/config/types";

type ListActivitiesRoute =
  | "/_publicLayout/activities/"
  | "/_masterLayout/bookmarks/";

interface ListActivitiesPageProps {
  routeFrom?: ListActivitiesRoute;
  navigateFrom?: BaseFiltersRoute;
  joinedOnly?: boolean;
  hideOrganizationFilter?: boolean;
}

const getTabDefaults = (tab: ListActivitiesMode, joinedOnly: boolean) => ({
  ...listActivitiesSearchDefaults[tab],
  ...(joinedOnly ? { ShowJoined: true } : {}),
});

export const ListActivitiesPage = ({
  routeFrom = "/_publicLayout/activities/",
  navigateFrom = "/activities/",
  joinedOnly = false,
  hideOrganizationFilter = false,
}: ListActivitiesPageProps) => {
  const search = useSearch({ from: routeFrom as any });

  const navigate = useNavigate({ from: navigateFrom as any });

  const activeTab = search.tab;
  const handleTabChange = (tab: ListActivitiesMode) => {
    navigate({
      search: getTabDefaults(tab, joinedOnly) as any,
      resetScroll: false,
    });
  };
  const effectiveSearch = joinedOnly
    ? ({ ...search, ShowJoined: true } as typeof search)
    : search;

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
            <ActivitiesContent
              tab={activeTab}
              search={effectiveSearch}
              from={navigateFrom}
              joinedOnly={joinedOnly}
              hideOrganizationFilter={hideOrganizationFilter}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
