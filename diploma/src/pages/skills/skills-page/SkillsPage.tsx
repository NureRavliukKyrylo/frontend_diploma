import styles from "./SkillsPage.module.scss";
import { sortingItems } from "./config/sortingItems";
import { SkillsFilterControls, SkillsListWidget } from "@widgets/skills";
import {
  SkillControlCard,
  SkillControlCardSkeleton,
  useSkillsListQuery,
} from "@entities/skill";
import { Pagination } from "@shared/ui";
import { AssingSkillModal } from "@features/skills";
import { AnimatePresence, motion } from "framer-motion";
import { useSkillsPage } from "./model/useSkillsPage";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

export const SkillsPage = () => {
  const {
    search,
    data,
    isModalOpen,
    selectedSkill,
    filterOpen,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    handleClearFilters,
    handleToggleFilter,
    handleAssignSkill,
    handleCloseModal,
  } = useSkillsPage();

  return (
    <div className={styles.skillsPageWrapper}>
      <div className={styles.skillsPageHeader}>
        <h1 className={styles.titleSkillsPage}>Explore & Assign Skills</h1>
      </div>

      <div className={styles.mainSkillsSection}>
        <div className={styles.filterSkillsWrapper}>
          <div className={styles.filtersInteractions}>
            <SkillsFilterControls
              search={search}
              onSearchChange={handleSearchChange}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
              onToggleFilter={handleToggleFilter}
              sortingItems={sortingItems}
            />
          </div>

          <motion.div
            layout
            initial={false}
            transition={{ layout: { ease: "backOut", duration: 0.4 } }}
            className={`${styles.skillsList} ${filterOpen ? styles.filterOpen : ""}`}
          >
            {data?.data.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No skills found</h2>
                <p>Try adjusting your filters or search query</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    items={12}
                    renderSkeleton={() => <SkillControlCardSkeleton />}
                    className={styles.skillsListWrapper}
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
                    <SkillsListWidget
                      renderCard={(skill, index) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                            delay: index * 0.06,
                          }}
                        >
                          <SkillControlCard
                            skill={skill}
                            menuItems={[
                              {
                                key: "assign",
                                label: "Assign skill",
                                onClick: () => handleAssignSkill(skill),
                              },
                            ]}
                          />
                        </motion.div>
                      )}
                      className={styles.skillsListWrapper}
                      useSkillsQuery={useSkillsListQuery(search)}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
        </div>
      </div>

      {data && data.pagination.totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            total={data.pagination.totalPages}
            page={search.Page}
            onChange={handlePageChange}
          />
        </div>
      )}

      {selectedSkill && (
        <AssingSkillModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          skill={selectedSkill}
        />
      )}
    </div>
  );
};
