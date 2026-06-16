import styles from "./SkillsPage.module.scss";
import { SkillsListWidget } from "@widgets/skills";
import {
  SkillControlCard,
  SkillControlCardSkeleton,
  sortingSkillItems,
  useSkillsListQuery,
} from "@entities/skill";
import { Pagination } from "@shared/ui";
import { AssingSkillModal } from "@features/skills";
import { AnimatePresence, motion } from "framer-motion";
import { useSkillsPage } from "./model/useSkillsPage";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SkillsFilterWidget } from "@widgets/skills/filters/ui/SkillsFilterWidget";
import { SortDropDown } from "@shared/ui/drop-down";
import {
  layoutTransition,
  fadeVariants,
  fadeDuration,
  staggeredCardVariantsNoHover,
} from "@shared/assets/animations";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { useTranslation } from "react-i18next";

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
    handleToggleFilter,
    handleAssignSkill,
    handleCloseModal,
  } = useSkillsPage();
  const { t } = useTranslation(["skill", "common"]);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
            <p className="errorHint">{t("common:errors.errorHint")}</p>
          </div>
        );
      }}
    >
      <div className={styles.skillsPageWrapper}>
        <div className={styles.skillsPageHeader}>
          <h1 className={styles.titleSkillsPage}>{t("skills.page.title")}</h1>
        </div>

        <div className={styles.mainSkillsSection}>
          <div className={styles.filterSkillsWrapper}>
            <div className={styles.filtersInteractions}>
              <ToggleDropdownButton onOpenChange={handleToggleFilter}>
                <SkillsFilterWidget search={search} />
              </ToggleDropdownButton>
              <SearchBar
                value={search.Search}
                onChange={handleSearchChange}
                variant="projects"
              />
              <SortDropDown
                options={sortingSkillItems}
                onSelect={handleSortChange}
                value={search.OrderBy ?? "Default"}
              />
            </div>

            <motion.div
              layout
              initial={false}
              transition={{ layout: layoutTransition }}
              className={`${styles.skillsList} ${filterOpen ? styles.filterOpen : ""}`}
            >
              {data?.data.length === 0 ? (
                <div className={styles.emptyState}>
                  <h2>{t("skills.page.emptyTitle")}</h2>
                  <p>{t("skills.page.emptyHint")}</p>
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
                      {...fadeVariants}
                      transition={fadeDuration}
                    >
                      <SkillsListWidget
                        renderCard={(skill, index) => (
                          <motion.div
                            key={skill.id}
                            custom={index + 1}
                            variants={staggeredCardVariantsNoHover}
                            initial="hidden"
                            animate="visible"
                          >
                            <SkillControlCard
                              skill={skill}
                              menuItems={[
                                {
                                  key: "assign",
                                  label: t("skills.profileTab.assignLabel"),
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
    </ErrorBoundary>
  );
};
