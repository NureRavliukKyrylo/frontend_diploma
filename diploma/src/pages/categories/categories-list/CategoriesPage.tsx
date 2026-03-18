import { CategoriesListWidget } from "@widgets/categories";
import { Suspense } from "react";
import { Pagination } from "@shared/ui";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import styles from "./CategoriesPage.module.scss";
import {
  AllCategoriesCard,
  CategoryCard,
  CategoryCardSkeleton,
  categoryQuery,
  useCategoriesListQuery,
} from "@entities/category";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

export function CategoriesPage() {
  const navigate = useNavigate({ from: "/categories/" });
  const { Page } = useSearch({ from: "/_masterLayout/categories/" });
  const search = useSearch({ from: "/_masterLayout/categories/" });
  const { data: categories } = useQuery(categoryQuery.list(search));

  return (
    <div className={styles.categoriesWrapperList}>
      <Suspense
        fallback={
          <ListWidgetSkeleton
            renderSkeleton={CategoryCardSkeleton}
            className={styles.skeletonListCategories}
            items={10}
          />
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(search)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CategoriesListWidget
              startSlot={
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: "easeOut", delay: 0 },
                    },
                    hover: {
                      scale: 1.03,
                      transition: { ease: "easeInOut", duration: 0.3 },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Link to="/projects">
                    <AllCategoriesCard />
                  </Link>
                </motion.div>
              }
              renderCard={(category, index) => (
                <motion.div
                  key={category.id}
                  custom={index + 1}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        ease: "easeOut",
                        delay: i * 0.06,
                      },
                    }),
                    hover: {
                      scale: 1.03,
                      transition: { ease: "easeInOut", duration: 0.3 },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ scale: { ease: "easeInOut", duration: 0.3 } }}
                >
                  <Link
                    to="/categories/$id"
                    params={{ id: category.id }}
                    search={{ Page: 1 }}
                  >
                    <CategoryCard
                      background={category.imageUrl}
                      name={category.name}
                    />
                  </Link>
                </motion.div>
              )}
              useCategoriesQuery={useCategoriesListQuery(search)}
            />
          </motion.div>
        </AnimatePresence>
      </Suspense>
      <div className={styles.paginationWrapper}>
        {categories && categories.pagination.totalPages > 1 && (
          <Pagination
            total={categories.pagination.totalPages}
            page={Page}
            onChange={(Page) => {
              navigate({
                search: (prev) => ({ ...prev, Page }),
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
