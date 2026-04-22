import { Pagination } from "@shared/ui";
import styles from "./OrganizationsPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { useOrganizationsPage } from "../model/useOrganizationsPage";
import {
  OrganizationCard,
  OrganizationCardSkeleton,
  organizationQuery,
  sortingOrganizationsItems,
  useOrganizationsListQuery,
} from "@entities/organization";
import {
  OrganizationFiltersWidget,
  OrganizationHeader,
  OrganizationsListWidget,
} from "@widgets/organizations";
import {
  fadeDuration,
  fadeVariants,
  headerVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { useRouter } from "@tanstack/react-router";

export function OrganizationsPage() {
  const {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useOrganizationsPage();

  const { data: organizations } = useQuery(organizationQuery.list(search));
  const router = useRouter();

  return (
    <div className={styles.organizationsWrapper}>
      <motion.div
        {...headerVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <OrganizationHeader
          organizationsCount={organizations?.pagination.totalCount}
        />
      </motion.div>
      <div className={styles.mainOrganizationsSection}>
        <div className={styles.filterOrganizationsWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <OrganizationFiltersWidget search={search} />
            </ToggleDropdownButton>
            <SearchBar
              value={search.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={sortingOrganizationsItems}
              onSelect={handleSort}
              value={search.OrderBy ?? "Default"}
            />
          </div>
          <motion.div
            layout
            initial={false}
            transition={{ layout: layoutTransition }}
            className={`${styles.organizationsList} ${isFilterOpen ? styles.filterOpen : ""}`}
          >
            {organizations?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No organizations found</h2>
                <p>Try adjusting your filters or search query</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    renderSkeleton={OrganizationCardSkeleton}
                    className={styles.organizationsListSkeletonWrapper}
                  />
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JSON.stringify(search)}
                    {...fadeVariants}
                    transition={fadeDuration}
                  >
                    <OrganizationsListWidget
                      renderCard={(organization, index) => (
                        <motion.div
                          key={organization.id}
                          custom={index + 1}
                          variants={staggeredCardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          className={styles.organizationCardMotion}
                          onClick={() =>
                            router.navigate({
                              to: "/organizations/$id",
                              params: { id: organization.id },
                            })
                          }
                        >
                          <OrganizationCard organization={organization} />
                        </motion.div>
                      )}
                      useOrganizationsQuery={useOrganizationsListQuery(search)}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
        </div>

        {organizations && organizations.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={organizations.pagination.totalPages}
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
