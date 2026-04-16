import type { ReactNode } from "react";
import styles from "./TaskCardBase.module.scss";
import type { Task } from "../../../model";
import { DefaultAvatar } from "@shared/assets/images/user";
import { Calendar } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";

interface TaskCardBaseProps {
  task: Task;
  startContent?: ReactNode;
  middleContent?: ReactNode;
  endContent?: ReactNode;
}

export const TaskCardBase = ({
  task,
  startContent,
  middleContent,
  endContent,
}: TaskCardBaseProps) => (
  <>
    <div className={styles.organizationInfoBlock}>
      <div className={styles.startSection}>
        <img
          className={styles.imageOrganization}
          src={task.organization?.logoUrl ?? DefaultAvatar}
          alt="image organization"
        />
        <h1>{task.organization?.name ?? "Unknown Organization"}</h1>
      </div>

      <div className={styles.taskInfoBlock}>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>

      {startContent}
    </div>

    {middleContent}

    <div className={styles.endSection}>
      <div className={styles.deadlineBlock}>
        <img src={Calendar} alt="calendar-deadline" />
        <h1>
          Deadline: <span>{formatDateToText(task.endAt)}</span>
        </h1>
      </div>
      {endContent}
    </div>
  </>
);
