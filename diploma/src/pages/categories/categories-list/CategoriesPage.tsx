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
import {
  fadeVariants,
  fadeDuration,
  createCardVariants,
} from "@shared/assets/animations";

const categoryCardVariants = createCardVariants({
  hover: { ease: "easeInOut", duration: 0.3 },
});

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
            {...fadeVariants}
            transition={fadeDuration}
          >
            <CategoriesListWidget
              startSlot={
                <motion.div
                  custom={0}
                  variants={categoryCardVariants}
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
                  variants={categoryCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ scale: { ease: "easeInOut", duration: 0.2 } }}
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
            onChange={(Page) =>
              navigate({ search: (prev) => ({ ...prev, Page }) })
            }
          />
        )}
      </div>
    </div>
  );
}
