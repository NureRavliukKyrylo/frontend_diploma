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
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { useTranslation } from "react-i18next";
import {
  fadeVariants,
  fadeDuration,
  createCardVariants,
} from "@shared/assets/animations";

const categoryCardVariants = createCardVariants({
  hover: { ease: "easeInOut", duration: 0.3 },
});

export function CategoriesPage() {
  const { t } = useTranslation(["category", "common"]);
  const navigate = useNavigate({ from: "/categories/" });
  const { Page } = useSearch({ from: "/_publicLayout/categories/" });
  const search = useSearch({ from: "/_publicLayout/categories/" });
  const { data: categories } = useQuery(categoryQuery.list(search));

  return (
    <div className={styles.categoriesWrapperList}>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
            <p className="errorHint">{t("common:errors.errorHint")}</p>
          </div>
        )}
      >
        <Suspense
          fallback={
            <ListWidgetSkeleton
              renderSkeleton={CategoryCardSkeleton}
              className={styles.skeletonListCategories}
              items={10}
            />
          }
        >
          {categories?.data?.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>{t("category:emptyState.title")}</h2>
              <p>{t("category:emptyState.subtitle")}</p>
            </div>
          ) : (
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
                      <Link to="/activities" search={{ tab: "projects" }}>
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
                      transition={{
                        scale: { ease: "easeInOut", duration: 0.2 },
                      }}
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
          )}
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
      </ErrorBoundary>
    </div>
  );
}
