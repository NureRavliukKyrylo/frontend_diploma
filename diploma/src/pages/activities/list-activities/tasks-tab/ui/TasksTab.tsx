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
import { TaskFiltersWidget, TasksListWidget } from "@widgets/tasks";
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
import { Pagination } from "@heroui/react";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";

interface TasksTabProps {
  search: TaskSearchParams;
}

export const TasksTab = ({ search }: TasksTabProps) => {
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    tasks,
    router,
  } = useTasksTab(search);

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
                    key={JSON.stringify(search)}
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
                          onClick={() =>
                            router.navigate({
                              to: "/tasks/$id",
                              params: { id: task.id },
                            })
                          }
                        >
                          <TaskCard task={task} />
                        </motion.div>
                      )}
                      useTasksQuery={useTasksListQuery(search)}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
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
