import {
  CategoriesWidget,
  CategoriesWidgetSkeleton,
} from "@widgets/categories";
import { Suspense } from "react";
import { Pagination } from "@shared/ui";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import styles from "./CategoriesPage.module.scss";
import {
  AllCategoriesCard,
  CategoryCard,
  categoryQuery,
} from "@entities/category";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

export function CategoriesPage() {
  const navigate = useNavigate({ from: "/categories/" });
  const { page } = useSearch({ from: "/_masterLayout/categories/" });
  const search = useSearch({ from: "/_masterLayout/categories/" });
  const { data: categories } = useQuery(categoryQuery.list(search));

  return (
    <div className={styles.categoriesWrapperList}>
      <Suspense fallback={<CategoriesWidgetSkeleton />}>
        <CategoriesWidget
          startSlot={
            <motion.div
              layout
              whileHover={{ scale: 1.03 }}
              transition={{
                ease: "easeInOut",
                duration: 0.2,
              }}
            >
              <Link to="/projects">
                <AllCategoriesCard />
              </Link>
            </motion.div>
          }
          renderCard={(category) => (
            <motion.div
              layout
              whileHover={{ scale: 1.03 }}
              transition={{
                ease: "easeInOut",
                duration: 0.2,
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
        />
      </Suspense>
      <div className={styles.paginationWrapper}>
        {categories && categories.pagination.totalPages > 1 && (
          <Pagination
            total={categories.pagination.totalPages}
            page={page}
            onChange={(page) => {
              navigate({
                search: (prev) => ({ ...prev, page }),
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
