import { Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SwipeableDrawer } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  getSortingTaskItems,
  TaskCard,
  TaskCardSkeleton,
  taskQuery,
  tasksSearchDefaults,
  useTasksListQuery,
  type TaskDrawerSearch,
  type TaskSearchParams,
  type TaskSortValues,
} from "@entities/task";
import type { Organization } from "@entities/organization";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { ToggleDropdownButton } from "@shared/ui/buttons/action-buttons/toggle/ToggleDropdownButton";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { TaskFiltersWidget } from "@widgets/tasks/filters/base-filter/ui/TaskFiltersWidget";
import { useTaskDrawer } from "@widgets/tasks/task-widget/main/model/useTaskDrawer";
import { TaskWidget } from "@widgets/tasks/task-widget/main/ui/TaskWidget";
import { TasksListWidget } from "@widgets/tasks/tasks-list/TasksListWidget";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import styles from "./Panel.module.scss";

interface OrganizationDetailsTasksPanelProps {
  organization: Organization;
  canManageOrganization?: boolean;
}

export const OrganizationDetailsTasksPanel = ({
  organization,
}: OrganizationDetailsTasksPanelProps) => {
  const { t } = useTranslation("common");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortingTaskItems = useMemo(() => getSortingTaskItems(t), [t]);
  const [search, setSearch] = useState<TaskSearchParams>({
    ...tasksSearchDefaults,
    OrganizationIds: [organization.id],
    Page: 1,
    PageSize: 9,
  });
  const {
    isOpen,
    openTask,
    closeTask,
    taskId,
    handleModeChange,
    taskMode,
    handleSortChange,
  } = useTaskDrawer(search as TaskDrawerSearch, (updater) => {
    setSearch((prev) => ({
      ...prev,
      ...updater(prev as unknown as TaskDrawerSearch),
      OrganizationIds: [organization.id],
    }));
  });
  const requestSearch = useMemo(() => {
    const {
      tab: _tab,
      taskId: _taskId,
      taskMode: _taskMode,
      DrawerOrderBy: _drawerOrderBy,
      DrawerPageSize: _drawerPageSize,
      ...searchWithoutDrawer
    } = search;

    return {
      ...searchWithoutDrawer,
      OrganizationIds: [organization.id],
    };
  }, [organization.id, search]);
  const { data: tasksResponse } = useQuery(taskQuery.list(requestSearch));

  return (
    <div className={styles.tasksPanel}>
      <div className={styles.filterTasksWrapper}>
        <motion.section
          className={styles.filtersInteractions}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <TaskFiltersWidget
              search={search}
              hideOrganizationFilter
              onChange={(patch) =>
                setSearch((prev) => ({
                  ...prev,
                  ...patch,
                  OrganizationIds: [organization.id],
                }))
              }
              onClearFilters={() =>
                setSearch({
                  ...tasksSearchDefaults,
                  OrganizationIds: [organization.id],
                  Page: 1,
                  PageSize: 9,
                })
              }
            />
          </ToggleDropdownButton>
          <SearchBar
            value={search.Search}
            onChange={(value) =>
              setSearch((prev) => ({
                ...prev,
                Search: value || undefined,
                Page: 1,
              }))
            }
            variant="projects"
          />
          <SortDropDown
            options={sortingTaskItems}
            onSelect={(value) =>
              setSearch((prev) => ({
                ...prev,
                OrderBy: value as TaskSortValues,
                Page: 1,
              }))
            }
            value={search.OrderBy ?? "Default"}
          />
        </motion.section>

        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          )}
        >
          <motion.div
            layout
            initial={false}
            transition={{ layout: layoutTransition }}
            className={`${styles.tasksList} ${isFilterOpen ? styles.filterOpen : ""}`}
          >
            {tasksResponse?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No Tasks found</h2>
                <p>Try adjusting your filters or search query</p>
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
                    key={JSON.stringify(requestSearch)}
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
                          onClick={() => openTask(task.id)}
                        >
                          <TaskCard task={task} />
                        </motion.div>
                      )}
                      useTasksQuery={useTasksListQuery(requestSearch)}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
        </ErrorBoundary>

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
                search={search as TaskDrawerSearch}
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

      {tasksResponse && tasksResponse.pagination.totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            total={tasksResponse.pagination.totalPages}
            page={search.Page}
            onChange={(page) =>
              setSearch((prev) => ({
                ...prev,
                Page: page,
                OrganizationIds: [organization.id],
              }))
            }
          />
        </div>
      )}
    </div>
  );
};
