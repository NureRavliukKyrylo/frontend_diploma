import styles from "./TasksTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { useTasksTab } from "../model/useTasksTab";
import { MyTasksFilterWidget, TasksListWidget } from "@widgets/tasks";
import {
  sortingTaskItems,
  useMyTasksListQuery,
  type MyTasksSearchParams,
} from "@entities/task";
import type { MyTasksRequestParams } from "@entities/task";
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

export const TasksTab = ({ search }: { search: MyTasksSearchParams }) => {
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
  } = useTasksTab(search);

  return (
    <>
      <div className={styles.mainMyTasksSection}>
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
            options={sortingTaskItems}
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
                  <h2>No tasks found</h2>
                  <p>Try adjusting your filters or search query</p>
                </>
              ) : (
                <>
                  <h2>No Tasks yet</h2>
                  <p>Join your first project to get started</p>
                </>
              )}
            </div>
          ) : (
            <Suspense
              fallback={
                <ListWidgetSkeleton
                  renderSkeleton={() => "LOADING"}
                  className={styles.myTasksListWrapper}
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
                      >
                        <TaskControlCard
                          task={task}
                          menuItems={[
                            {
                              key: "leave",
                              label: "Leave Task",
                              onClick: () => handleLeaveTask(task),
                              variant: "leave",
                            },
                          ]}
                        />
                      </motion.div>
                    )}
                    useTasksQuery={useMyTasksListQuery(search)}
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
      {selectedTask && (
        <LeaveConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          entityId={selectedTask.id}
          entityType="task"
          entityName={selectedTask.title}
        />
      )}
    </>
  );
};
