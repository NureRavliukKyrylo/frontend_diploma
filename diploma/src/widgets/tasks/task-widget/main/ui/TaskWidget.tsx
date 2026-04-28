import styles from "./TaskWidget.module.scss";
import { ProgressBar, Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { JoinProjectButton } from "@features/project";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateToText } from "@shared/libs/date";
import { Calendar, Reccurence } from "@shared/assets/icons/info";
import { Arrow } from "@shared/assets/icons/actions";
import { type TaskDrawerSearch, type TaskMode } from "@entities/task";
import { taskMainTabs } from "../config/taskMainTabs";
import { TaskWidgetSkeleton } from "./TaskWidgetSkeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import type { FeedbackSortValues } from "@entities/feedback";
import { useTaskWidget } from "../model/useTaskWidget";

interface TaskWidgetProps {
  search: TaskDrawerSearch;
  taskId?: string;
  taskMode: TaskMode;
  handleModeChange: (taskMode: TaskMode) => void;
  handleSort: (value: FeedbackSortValues) => void;
}

export const TaskWidget = ({
  search,
  handleModeChange,
  taskMode,
  taskId,
  handleSort,
}: TaskWidgetProps) => {
  const { task, isLoading, isError, error, statusConfig, policyConfig, forms } =
    useTaskWidget({ taskId, search, handleSort });

  if (isLoading) return <TaskWidgetSkeleton />;

  if (isError)
    return (
      <div className={styles.errorState}>
        <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
        <p className="errorHint">Try reloading the page or come back later.</p>
      </div>
    );

  return (
    <div className={styles.wrapperTaskWidget}>
      <motion.div
        className={styles.taskWidgetHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.headerTaskInfo}>
          <div
            className={styles.taskStatus}
            style={{
              color: statusConfig?.color,
              boxShadow: `0px 5px 15px  ${statusConfig?.shadow}`,
            }}
          >
            {statusConfig?.label}
          </div>
          <div className={styles.mainTaskData}>
            <div className={styles.taskOrganizationInfo}>
              <div className={styles.titleHeader}>
                <h1>{task?.title}</h1>
                <div className={styles.taskMetaInfo}>
                  <span className={styles.metaChipTask}>Task</span>
                  {task?.recurrence && (
                    <span className={styles.reccurenceInfo}>
                      <Reccurence className={styles.reccurenceIcon} />
                      <h1>{task.recurrence}</h1>
                    </span>
                  )}
                  {task?.endAt && (
                    <span className={`${styles.metaChip} ${styles.calendar}`}>
                      <Calendar className={styles.calendarImg} />
                      <span>{formatDateToText(task.endAt, true)}</span>
                    </span>
                  )}
                  {policyConfig && (
                    <span
                      className={`${styles.metaChip} ${styles.policy}`}
                      style={{ boxShadow: policyConfig.boxShadow }}
                    >
                      <span
                        style={{
                          background: policyConfig.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {policyConfig.label}
                      </span>
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.organizationInfo}>
                <img
                  src={task?.organization?.logoUrl}
                  alt="organization-image"
                />
                <p>{task?.organization?.name}</p>
              </div>
            </div>
            <div className={styles.relatedActivities}>
              {task?.project && (
                <div className={styles.activityPill}>
                  <h1>PROJECT</h1>
                  <LinkButtonWrapper
                    to="/projects/$id"
                    params={{ id: task.project?.id }}
                    className={styles.goToActivity}
                  >
                    <img src={Arrow} alt="arrow" />
                  </LinkButtonWrapper>
                </div>
              )}
              {task?.event && (
                <div className={styles.activityPill}>
                  <h1>EVENT</h1>
                  <LinkButtonWrapper
                    to="/events/$id"
                    params={{ id: task.event?.id }}
                    className={styles.goToActivity}
                  >
                    <img src={Arrow} alt="arrow" />
                  </LinkButtonWrapper>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.statsTaskInfo}>
          <div className={styles.levelTaskInfo}>
            <div className={styles.headerLevelBar}>
              <span className={styles.current}>Level 12</span>
              <span className={styles.xp}>{task?.progressPercent}/100</span>
            </div>
            <ProgressBar current={task?.progressPercent ?? 0} max={100} />
            <div className={styles.footerLevelBar}>
              <span className={styles.label}>Next level</span>
              <span className={styles.next}>Level 13</span>
            </div>
          </div>
          <div className={styles.ratingTaskInfo}>
            <h1>4.5</h1>
            <p>(120 votes)</p>
          </div>
        </div>
        <div className={styles.taskFooterContent}>
          <ReadMoreButton collapsedHeight={90}>
            <p>{task?.description}</p>
          </ReadMoreButton>
          <div className={styles.joinTaskBlockButton}>
            {task?.id && <JoinProjectButton projectId={task.id} />}
          </div>
        </div>
      </motion.div>
      <div className={styles.contentBlock}>
        <div className={styles.toggleWrapper}>
          <Toggle
            tabs={taskMainTabs}
            activeValue={taskMode}
            onChange={handleModeChange}
            buttonClassName={styles.toggleTaskButton}
            activeButtonClassName={styles.toggleTaskButtonActive}
            className={styles.toggleTask}
            pillClassName={styles.toggleTaskPill}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={taskMode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {forms && forms[taskMode]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
