import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import styles from "./CategoryDetailPage.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { headerVariants } from "@shared/assets/animations";
import { useQuery } from "@tanstack/react-query";
import { categoryQuery } from "@entities/category";
import { CategoryDetailHeader } from "@widgets/categories";
import type { ListActivitiesMode } from "@shared/config/types";
import { categoryDetailSearchDefaults } from "../libs/categoryDetailSearchSchema";
import { ActivitiesCategoryContent } from "../config/categoryActivitiesForms";

export const CategoryDetailPage = () => {
  const search = useSearch({ from: "/_masterLayout/categories/$id/" });
  const { id } = useParams({ from: "/_masterLayout/categories/$id/" });
  const { data: category } = useQuery(categoryQuery.id(id));
  const navigate = useNavigate({ from: "/categories/$id/" });

  const activeTab = search.tab;
  const handleTabChange = (tab: ListActivitiesMode) => {
    navigate({ search: categoryDetailSearchDefaults[tab], resetScroll: false });
  };

  return (
    <div className={styles.activitiesCategoryWrapper}>
      <motion.div
        {...headerVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {category && (
          <CategoryDetailHeader
            activeTab={activeTab}
            onTabChange={handleTabChange}
            category={category}
          />
        )}
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
            <ActivitiesCategoryContent
              tab={activeTab}
              search={search}
              categoryId={id}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
