import styles from "./TaskWidget.module.scss";
import { useQuery } from "@tanstack/react-query";
import { ProgressBar, Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { JoinProjectButton } from "@features/project";
import { AnimatePresence, motion } from "framer-motion";
import { useMapUserLocation } from "@features/map";
import { formatDateToText } from "@shared/libs/date";
import { Calendar, Reccurence } from "@shared/assets/icons/info";
import { Arrow } from "@shared/assets/icons/actions";
import { taskQuery } from "@entities/task";
import { getTaskMainForms } from "../config/taskMainForms";
import { taskMainTabs } from "../config/taskMainTabs";
import { useTaskDrawer } from "../model/useTaskDrawer";
import {
  getEntityStatusConfig,
  getPolicyStatusConfig,
} from "@shared/libs/entity";
import { TaskWidgetSkeleton } from "./TaskWidgetSkeleton";
import { getHttpErrorInfo } from "@shared/libs/error";

export const TaskWidget = () => {
  const { taskId, taskMode, handleModeChange } = useTaskDrawer();

  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...taskQuery.id(taskId!),
    enabled: !!taskId,
  });

  const { user, coordinates: userLocation } = useMapUserLocation();

  if (isLoading) return <TaskWidgetSkeleton />;

  if (isError)
    return (
      <div className={styles.errorState}>
        <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
        <p className="errorHint">Try reloading the page or come back later.</p>
      </div>
    );

  const hasLocation = !!(task?.event?.location || task?.project?.location);

  const availableTabs = hasLocation
    ? taskMainTabs
    : taskMainTabs.filter((t) => t.value !== "overview");

  const safeMode = availableTabs.some((t) => t.value === taskMode)
    ? taskMode
    : "members";

  const statusConfig = task ? getEntityStatusConfig(task.status) : null;
  const policyConfig = task?.joinPolicy
    ? getPolicyStatusConfig(task.joinPolicy)
    : null;

  const forms = task
    ? getTaskMainForms({
        task,
        userLocation,
        userId: user?.id,
      })
    : null;

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
            tabs={availableTabs}
            activeValue={safeMode}
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
