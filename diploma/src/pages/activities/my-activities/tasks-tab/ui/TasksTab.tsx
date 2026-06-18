import styles from "./TasksTab.module.scss";
import { LinkButtonWrapper, ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { useTasksTab } from "../model/useTasksTab";
import {
  MyTasksFilterWidget,
  TasksListWidget,
  TaskWidgetJoined,
} from "@widgets/tasks";
import {
  getSortingTaskItems,
  TaskControlCardSkeleton,
  useMyTasksListQuery,
  type MyTasksSearchParams,
  type MyTasksRequestParams,
  type TaskDrawerJoinedSearch,
} from "@entities/task";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariantsNoHover,
} from "@shared/assets/animations";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { TaskControlCard } from "@entities/task/ui/task-card/control/TaskControlCard";
import { LeaveConfirmationModal } from "@features/participation";
import { SwipeableDrawer } from "@mui/material";
import { useMyActivitiesTaskDrawer } from "../model/useMyActivitiesTaskDrawer";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";

interface TasksTabProps {
  search: MyTasksSearchParams;
}

export const TasksTab = ({ search }: TasksTabProps) => {
  const { t } = useTranslation(["activities", "common"]);
  const { tab, taskId: _, taskMode: __, ...taskSearch } = search;
  const { isOpen, openTask, closeTask, taskId, handleModeChange, taskMode } =
    useMyActivitiesTaskDrawer();
  const {
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    tasks,
    handleCloseModal,
    handleLeaveTask,
    hasActiveFilters,
    isEmpty,
    isFilterOpen,
    isModalOpen,
    selectedTask,
  } = useTasksTab(taskSearch);

  return (
    <div className={styles.mainMyTasksSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
            <p className="errorHint">{t("common:errors.errorHint")}</p>
          </div>
        )}
      >
        <div className={styles.filtersBlock}>
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <MyTasksFilterWidget search={search as MyTasksRequestParams} />
          </ToggleDropdownButton>
          <SearchBar
            value={search.Search}
            onChange={handleSearch}
            variant="projects"
          />
          <SortDropDown
            options={getSortingTaskItems(t)}
            onSelect={handleSort}
            value={search.OrderBy ?? "Default"}
          />
        </div>

        <motion.div
          layout
          initial={false}
          transition={{ layout: layoutTransition }}
          className={`${styles.myTasksList} ${isFilterOpen ? styles.filterOpen : ""}`}
        >
          {isEmpty ? (
            <div className={styles.emptyState}>
              {hasActiveFilters ? (
                <>
                  <h2>{t("activities:my.tasks.notFound")}</h2>
                  <p>{t("activities:my.tasks.notFoundHint")}</p>
                </>
              ) : (
                <>
                  <h2>{t("activities:my.tasks.empty")}</h2>
                  <p>{t("activities:my.tasks.emptyHint")}</p>
                </>
              )}
            </div>
          ) : (
            <Suspense
              fallback={
                <ListWidgetSkeleton
                  renderSkeleton={() => (
                    <div className={styles.motionCard}>
                      <TaskControlCardSkeleton />
                    </div>
                  )}
                  items={5}
                  className={styles.myTasksListWrapper}
                />
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={JSON.stringify(taskSearch)}
                  {...fadeVariants}
                  transition={fadeDuration}
                >
                  <TasksListWidget
                    className={styles.myTasksListWrapper}
                    renderCard={(task, index) => (
                      <motion.div
                        key={task.id}
                        custom={index + 1}
                        variants={staggeredCardVariantsNoHover}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={styles.motionCard}
                        onClick={() => {
                          openTask(task.id);
                        }}
                      >
                        <TaskControlCard
                          task={task}
                          menuItems={[
                            {
                              key: "leave",
                              label: t("common:participation.leave", {
                                entity: t(`common:participation.entities.task`),
                              }),
                              onClick: () => handleLeaveTask(task),
                              variant: "leave",
                            },
                          ]}
                          actionsButton={
                            <motion.div
                              whileHover={{
                                scale: 1.03,
                                backgroundColor: "#000000",
                                color: "#ffffff",
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className={styles.getStartedButton}
                            >
                              <LinkButtonWrapper
                                to="/activities/my"
                                search={{ tab: "tasks", taskId: task.id }}
                                resetScroll={false}
                                className={styles.btnLink}
                              >
                                {t("common:actions.getStarted")}
                              </LinkButtonWrapper>
                            </motion.div>
                          }
                        />
                      </motion.div>
                    )}
                    useTasksQuery={useMyTasksListQuery(taskSearch)}
                  />
                </motion.div>
              </AnimatePresence>
            </Suspense>
          )}
        </motion.div>

        <SwipeableDrawer
          open={isOpen}
          onClose={closeTask}
          onOpen={() => {}}
          anchor="right"
          className={styles.drawer}
        >
          <div className={styles.drawerContent}>
            {taskId && (
              <TaskWidgetJoined
                search={search as TaskDrawerJoinedSearch}
                handleModeChange={handleModeChange}
                taskMode={taskMode}
                taskId={taskId}
              />
            )}
          </div>
        </SwipeableDrawer>

        {tasks && tasks.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={tasks.pagination.totalPages}
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}

        {selectedTask && (
          <LeaveConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            entityId={selectedTask.id}
            entityType="task"
            entityName={selectedTask.title}
          />
        )}
      </ErrorBoundary>
    </div>
  );
};
