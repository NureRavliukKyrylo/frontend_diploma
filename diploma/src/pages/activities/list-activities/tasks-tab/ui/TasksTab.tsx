import {
  getSortingTaskItems,
  TaskCard,
  TaskCardSkeleton,
  useTasksListQuery,
  type TaskDrawerSearch,
  type TaskSearchParams,
} from "@entities/task";
import { useTasksTab } from "../model/useTasksTab";
import styles from "./TasksTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { TaskFiltersWidget, TasksListWidget, TaskWidget } from "@widgets/tasks";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { Pagination } from "@shared/ui";
import { useActivitiesTaskDrawer } from "../model/useActivitiesTaskDrawer";
import { SwipeableDrawer } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { BaseFiltersRoute } from "@shared/config/types";

interface TasksTabProps {
  search: TaskSearchParams;
  from?: BaseFiltersRoute;
  joinedOnly?: boolean;
  hideOrganizationFilter?: boolean;
}

const getRouteFrom = (from: BaseFiltersRoute) =>
  from === "/bookmarks/"
    ? "/_masterLayout/bookmarks/"
    : "/_publicLayout/activities/";

export const TasksTab = ({
  search,
  from = "/activities/",
  joinedOnly = false,
  hideOrganizationFilter = false,
}: TasksTabProps) => {
  const effectiveSearch = joinedOnly ? { ...search, ShowJoined: true } : search;
  const { t } = useTranslation(["activities", "common"]);
  const {
    isOpen,
    openTask,
    closeTask,
    taskId,
    handleModeChange,
    taskMode,
    handleSortChange,
  } = useActivitiesTaskDrawer(getRouteFrom(from), from, joinedOnly);
  const {
    taskId: _,
    taskMode: __,
    DrawerOrderBy,
    DrawerPageSize,
    ...tasksSearch
  } = effectiveSearch;
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    tasks,
  } = useTasksTab(tasksSearch, from, joinedOnly);

  return (
    <div className={styles.mainTasksSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          );
        }}
      >
        <div className={styles.filterTasksWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <TaskFiltersWidget
                search={effectiveSearch}
                from={from}
                hideOrganizationFilter={hideOrganizationFilter}
              />
            </ToggleDropdownButton>
            <SearchBar
              value={effectiveSearch.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={getSortingTaskItems(t)}
              onSelect={handleSort}
              value={effectiveSearch.OrderBy ?? "Default"}
            />
          </div>
          <motion.div
            layout
            initial={false}
            transition={{ layout: layoutTransition }}
            className={`${styles.tasksList} ${isFilterOpen ? styles.filterOpen : ""}`}
          >
            {tasks?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>{t("activities:states.emptyTasks.title")}</h2>
                <p>{t("activities:states.emptyTasks.subtitle")}</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    renderSkeleton={() => (
                      <div className={styles.skeletonWrapper}>
                        <TaskCardSkeleton />
                      </div>
                    )}
                    className={styles.tasksListWrapper}
                  />
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JSON.stringify(tasksSearch)}
                    {...fadeVariants}
                    transition={fadeDuration}
                  >
                    <TasksListWidget
                      className={styles.tasksListWrapper}
                      renderCard={(task, index) => (
                        <motion.div
                          key={task.id}
                          custom={index + 1}
                          variants={staggeredCardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          className={styles.taskCardMotion}
                          onClick={() => {
                            openTask(task.id);
                          }}
                        >
                          <TaskCard task={task} />
                        </motion.div>
                      )}
                      useTasksQuery={useTasksListQuery(tasksSearch)}
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
                <TaskWidget
                  search={effectiveSearch as TaskDrawerSearch}
                  handleModeChange={handleModeChange}
                  taskMode={taskMode}
                  taskId={taskId}
                  handleSort={handleSortChange}
                  onClose={closeTask}
                />
              )}
            </div>
          </SwipeableDrawer>
        </div>

        {tasks && tasks.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={tasks.pagination.totalPages}
              page={effectiveSearch.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
