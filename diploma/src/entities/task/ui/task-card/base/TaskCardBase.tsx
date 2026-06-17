import type { ReactNode } from "react";
import styles from "./TaskCardBase.module.scss";
import type { Task } from "../../../model";
import { DefaultAvatar } from "@shared/assets/images/user";
import { Calendar } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";
import { useTranslation } from "react-i18next";

interface TaskCardBaseProps {
  task: Task;
  topContent?: ReactNode;
  startContent?: ReactNode;
  middleContent?: ReactNode;
  endContent?: ReactNode;
}

export const TaskCardBase = ({
  task,
  startContent,
  middleContent,
  endContent,
  topContent,
}: TaskCardBaseProps) => {
  const { t } = useTranslation(["task"]);

  return (
    <>
      <div className={styles.headerTaskBlock}>
        <div className={styles.startSection}>
          <div className={styles.organizationInfo}>
            <img
              src={task.organization?.logoUrl ?? DefaultAvatar}
              alt={t("task:cards.imgAltOrganization")}
            />
            <h1>
              {task.organization?.name ?? t("task:cards.unknownOrganization")}
            </h1>
          </div>
          {topContent}
        </div>

        <div className={styles.taskInfoBlock}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </div>

        {startContent}
      </div>

      <div className={styles.middleSection}>{middleContent}</div>

      <div className={styles.endSection}>
        <div className={styles.deadlineBlock}>
          <div className={styles.deadlineInner}>
            <Calendar className={styles.calendarTask} />
            <div className={styles.deadlineTextInfo}>
              <h1>{t("task:cards.deadline")}</h1>
              <span>{formatDateToText(task.endAt)}</span>
            </div>
          </div>
        </div>
        {endContent}
      </div>
    </>
  );
};
