import type { ReactNode } from "react";
import type { Task } from "@entities/task/model";
import styles from "./TaskBoardItemBase.module.scss";
import { Calendar } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";
import { useTranslation } from "react-i18next";

interface TaskBoardItemBaseProps {
  task: Task;
  footerContent?: ReactNode;
}

export const TaskBoardItemBase = ({
  task,
  footerContent,
}: TaskBoardItemBaseProps) => {
  const { i18n } = useTranslation();
  return (
    <>
      <h1 className={styles.taskBoardTitle}>{task.title}</h1>
      <p className={styles.taskBoardDescription}>{task.description}</p>
      <div className={styles.deadlineBlock}>
        <Calendar className={styles.calendarTask} />
        <span>
          {formatDateToText(task.endAt, i18n.language as "en" | "uk", true)}
        </span>
      </div>
      <div className={styles.dividerLine} />
      <div className={styles.footerContent}>{footerContent}</div>
    </>
  );
};
