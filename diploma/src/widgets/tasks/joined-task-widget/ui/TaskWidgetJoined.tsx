import styles from "./TaskWidget.module.scss";
import { Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateRange } from "@shared/libs/date";
import {
  Calendar,
  ChatIcon,
  Reccurence,
  RoleIcon,
} from "@shared/assets/icons/info";
import { Arrow } from "@shared/assets/icons/actions";
import {
  type TaskDrawerJoinedSearch,
  type TaskJoinedMode,
} from "@entities/task";
import { getHttpErrorInfo } from "@shared/libs/error";

import {
  ParticipationJoinButton,
  ParticipationLeaveButton,
} from "@features/participation";
import { TaskWidgetJoinedSkeleton } from "./TaskWidgetJoinedSkeleton";
import { taskJoinedMainTabs } from "../config/taskJoinedMainTabs";
import { useTaskJoinedWidget } from "../model/useTaskJoinedWidget";

interface TaskWidgetJoinedProps {
  search: TaskDrawerJoinedSearch;
  taskId?: string;
  taskMode: TaskJoinedMode;
  handleModeChange: (taskMode: TaskJoinedMode) => void;
}

export const TaskWidgetJoined = ({
  search,
  handleModeChange,
  taskMode,
  taskId,
}: TaskWidgetJoinedProps) => {
  const { task, isLoading, isError, error, statusConfig, forms } =
    useTaskJoinedWidget({ taskId, search });

  if (isLoading) return <TaskWidgetJoinedSkeleton />;

  if (isError)
    return (
      <div className={styles.errorState}>
        <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
        <p className="errorHint">Try reloading the page or come back later.</p>
      </div>
    );

  return (
    <div className={styles.wrapperTaskJoinedWidget}>
      <motion.div
        className={styles.taskWidgetJoinedHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.headerTaskJoinedInfo}>
          <div
            className={styles.taskJoinedStatus}
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
                  <span className={styles.metaChipTask}>Joined Task</span>
                  {task?.recurrence && (
                    <span className={styles.reccurenceInfo}>
                      <Reccurence className={styles.reccurenceIcon} />
                      <h1>{task.recurrence}</h1>
                    </span>
                  )}
                  {task?.endAt && (
                    <span className={`${styles.metaChip} ${styles.calendar}`}>
                      <Calendar className={styles.calendarImg} />
                      <span>{formatDateRange(task.startAt, task.endAt)}</span>
                    </span>
                  )}
                  <span className={`${styles.metaChip} ${styles.roleChip}`}>
                    <RoleIcon className={styles.role} />
                    <span>{task?.currentUserRole.name}</span>
                  </span>
                </div>
              </div>
              <div className={styles.chatOrganizationBlock}>
                <motion.div
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <img
                    src={task?.organization?.logoUrl}
                    alt="organization-image"
                  />
                  <p>{task?.organization?.name}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LinkButtonWrapper className={styles.chatWrapper}>
                    <ChatIcon className={styles.chatIcon} />
                    <h1>TASK CHAT</h1>
                  </LinkButtonWrapper>
                </motion.div>
              </div>
            </div>
            <div className={styles.relatedActivities}>
              {task?.project && (
                <div className={styles.activityPill}>
                  <h1>PROJECT</h1>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <LinkButtonWrapper
                      to="/projects/$id"
                      params={{ id: task.project?.id }}
                      className={styles.goToActivity}
                    >
                      <Arrow className={styles.goToActivityLink} />
                    </LinkButtonWrapper>
                  </motion.div>
                </div>
              )}
              {task?.event && (
                <div className={styles.activityPill}>
                  <h1>EVENT</h1>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <LinkButtonWrapper
                      to="/events/$id"
                      params={{ id: task.event?.id }}
                      className={styles.goToActivity}
                    >
                      <Arrow className={styles.goToActivityLink} />
                    </LinkButtonWrapper>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.taskFooterContent}>
          <ReadMoreButton collapsedHeight={90}>
            <p>{task?.description}</p>
          </ReadMoreButton>
          {task?.id && task.hasPendingJoinRequest && (
            <p className={styles.pendingRequest}>
              Your join request is pending approval
            </p>
          )}

          {task?.id && !task.hasPendingJoinRequest && (
            <div className={styles.joinTaskBlockButton}>
              {task.isJoined ? (
                <ParticipationLeaveButton
                  entityId={task.id}
                  entityType="task"
                  entityName={task.title}
                />
              ) : (
                <ParticipationJoinButton entityId={task.id} entityType="task" />
              )}
            </div>
          )}
        </div>
      </motion.div>
      <div className={styles.contentBlock}>
        <div className={styles.toggleWrapper}>
          <Toggle
            tabs={taskJoinedMainTabs}
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
