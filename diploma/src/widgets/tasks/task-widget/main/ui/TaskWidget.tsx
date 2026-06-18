import styles from "./TaskWidget.module.scss";
import { Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateRange } from "@shared/libs/date";
import { Calendar, Reccurence } from "@shared/assets/icons/info";
import { Arrow } from "@shared/assets/icons/actions";
import { type TaskDrawerSearch, type TaskMode } from "@entities/task";
import { getTaskMainTabs } from "../config/taskMainTabs";
import { TaskWidgetSkeleton } from "./TaskWidgetSkeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import type { FeedbackSortValues } from "@entities/feedback";
import { useTaskWidget } from "../model/useTaskWidget";
import {
  ParticipationJoinButton,
  ParticipationLeaveButton,
} from "@features/participation";
import { ReportButton } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation(["task", "common"]);
  const { task, isLoading, isError, error, statusConfig, policyConfig, forms } =
    useTaskWidget({ taskId, search, handleSort });

  const localizedTabs = getTaskMainTabs(t);

  if (isLoading) return <TaskWidgetSkeleton />;

  if (isError)
    return (
      <div className={styles.errorState}>
        <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
        <p className="errorHint">{t("common:errors.errorHint")}</p>
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
          {task && (
            <div className={styles.reportWrapper}>
              <ReportButton
                subjectType={ModerationSubjectType.Task}
                subjectId={task.id}
              />
            </div>
          )}
          <div
            className={styles.taskStatus}
            style={{
              backgroundColor: statusConfig?.bg,
              color: statusConfig?.color,
              boxShadow: `0px 5px 15px ${statusConfig?.shadow}`,
            }}
          >
            {statusConfig?.label}
          </div>
          <div className={styles.mainTaskData}>
            <div className={styles.taskOrganizationInfo}>
              <div className={styles.titleHeader}>
                <h1>{task?.title}</h1>
                <div className={styles.taskMetaInfo}>
                  <span className={styles.metaChipTask}>
                    {t("task:labels.task")}
                  </span>
                  {task?.recurrence && (
                    <span className={styles.reccurenceInfo}>
                      <Reccurence className={styles.reccurenceIcon} />
                      <h1>
                        {t(`task:modes.${task.recurrence}`, {
                          defaultValue: task.recurrence,
                        })}
                      </h1>
                    </span>
                  )}
                  {task?.endAt && (
                    <span className={`${styles.metaChip} ${styles.calendar}`}>
                      <Calendar className={styles.calendarImg} />
                      <span>
                        {formatDateRange(
                          task.startAt,
                          task.endAt,
                          i18n.language as "en" | "ua",
                        )}
                      </span>
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
              <div className={styles.rightBlockInfo}>
                <div className={styles.organizationInfo}>
                  <img
                    src={task?.organization?.logoUrl}
                    alt="organization-image"
                  />
                  <p>{task?.organization?.name}</p>
                </div>
                <div className={styles.ratingTaskInfo}>
                  <h1>{task?.rating.value}</h1>
                  <p>
                    {t("task:labels.votes", { count: task?.rating.totalVotes })}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.relatedActivities}>
              {task?.project && (
                <div className={styles.activityPill}>
                  <h1>{t("task:labels.project")}</h1>
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
                  <h1>{t("task:labels.event")}</h1>
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
          {task?.id && task.hasPendingLeaveRequest && (
            <p className={`${styles.pendingRequest} ${styles.leave}`}>
              {t("task:states.pendingLeave")}
            </p>
          )}

          {task?.id && task.hasPendingJoinRequest && (
            <p className={styles.pendingRequest}>
              {t("task:states.pendingJoin")}
            </p>
          )}

          {task?.id &&
            !task.hasPendingJoinRequest &&
            !task.hasPendingLeaveRequest && (
              <div className={styles.joinTaskBlockButton}>
                {task.isJoined ? (
                  <ParticipationLeaveButton
                    entityId={task.id}
                    entityType="task"
                    entityName={task.title}
                  />
                ) : (
                  <ParticipationJoinButton
                    entityId={task.id}
                    entityType="task"
                  />
                )}
              </div>
            )}
        </div>
      </motion.div>
      <div className={styles.contentBlock}>
        <div className={styles.toggleWrapper}>
          <Toggle
            tabs={localizedTabs}
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
