import {
  sortingTaskItems,
  TaskCard,
  TaskCardSkeleton,
  useTasksListQuery,
  type TaskSearchParams,
} from "@entities/task";
import { useTasksTab } from "../model/useTasksTab";
import styles from "./TasksTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import {
  TaskFiltersWidget,
  TasksListWidget,
  TaskWidget,
  TaskWidgetSkeleton,
  useTaskDrawer,
} from "@widgets/tasks";
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
import { Drawer } from "@mui/material";

interface TasksTabProps {
  search: TaskSearchParams;
}

export const TasksTab = ({ search }: TasksTabProps) => {
  const { isOpen, openTask, closeTask, taskId } = useTaskDrawer();
  const { taskId: _, taskMode: __, ...tasksSearch } = search;
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    tasks,
  } = useTasksTab(tasksSearch);

  return (
    <div className={styles.mainTasksSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
              <p className="errorHint">
                Try reloading the page or come back later.
              </p>
            </div>
          );
        }}
      >
        <div className={styles.filterTasksWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <TaskFiltersWidget search={search} />
            </ToggleDropdownButton>
            <SearchBar
              value={search.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={sortingTaskItems}
              onSelect={handleSort}
              value={search.OrderBy ?? "Default"}
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
                <h2>No Tasks found</h2>
                <p>Try adjusting your filters or search query</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    renderSkeleton={TaskCardSkeleton}
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
                            const hasLocation = !!(
                              task.event?.location || task.project?.location
                            );
                            openTask(task.id, hasLocation);
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
          <Drawer
            open={isOpen}
            onClose={closeTask}
            anchor="right"
            sx={{
              zIndex: 10000,
              "& .MuiDrawer-paper": {
                maxWidth: "1000px",
                width: "100%",
                backgroundColor: "#F4F4F4",
                borderRadius: 0,
                overflow: "hidden",
              },
              "& .MuiBackdrop-root.MuiModal-backdrop": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <div
              style={{
                height: "100%",
                overflowY: "auto",
                scrollbarWidth: "none",
                padding: 0,
              }}
            >
              {taskId && <TaskWidget />}
            </div>
          </Drawer>
        </div>

        {tasks && tasks.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={tasks.pagination.totalPages}
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
