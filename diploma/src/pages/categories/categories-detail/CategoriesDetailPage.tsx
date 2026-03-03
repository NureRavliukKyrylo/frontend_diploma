import { CategoryDetailWidget } from "@widgets/categories";
import { FilterButton } from "@shared/ui/buttons";
import { Suspense, useState } from "react";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import styles from "./CategoriesDetailPage.module.scss";
import { motion } from "framer-motion";
import {
  ProjectsListWidget,
  ProjectsListWidgetSkeleton,
} from "@widgets/projects";
import { sortingItems } from "./config/sortingItems";
import { CategoryProjectFiltersWidget } from "@widgets/categories";

export function CategoryDetailPage() {
  const navigate = useNavigate({ from: "/categories/$id/" });
  const search = useSearch({ from: "/_masterLayout/categories/$id/" });
  const { id } = useParams({ from: "/_masterLayout/categories/$id/" });

  const searchWithCategory = {
    ...search,
    CategoryIds: [id],
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className={styles.projectsCategoryWrapper}>
      <CategoryDetailWidget />
      <div className={styles.filterProjectsWrapper}>
        <div className={styles.filtersInteractions}>
          <FilterButton onOpenChange={(value) => setIsFilterOpen(value)}>
            <CategoryProjectFiltersWidget
              search={search}
              from="/categories/$id/"
            />
          </FilterButton>
          <SearchBar
            value={search.Search}
            onChange={(value) => {
              navigate({
                search: (prev) => ({ ...prev, Search: value }),
                resetScroll: false,
              });
            }}
            variant="projects"
          />
          <SortDropDown
            options={sortingItems}
            onSelect={(value) =>
              navigate({
                search: (prev) => ({ ...prev, OrderBy: value }),
                resetScroll: false,
              })
            }
            value={search.OrderBy}
          />
        </div>
        <motion.div
          layout
          transition={{
            layout: {
              ease: "backOut",
              duration: 0.4,
            },
          }}
          className={`${styles.projectsList} ${
            isFilterOpen ? styles.filterOpen : ""
          }`}
        >
          <Suspense fallback={<ProjectsListWidgetSkeleton />}>
            <ProjectsListWidget search={searchWithCategory} />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
