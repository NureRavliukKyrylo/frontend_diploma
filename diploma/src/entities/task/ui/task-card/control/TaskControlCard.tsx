import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ActionsIcon } from "@shared/assets/icons/actions";
import type { Task } from "../../../model";
import { TaskCardBase } from "../base/TaskCardBase";
import styles from "./TaskControlCard.module.scss";
import { getEntityStatusConfig } from "@shared/libs/entity";
import type { MenuItem } from "@shared/config/types";

interface TaskControlCardProps {
  task: Task;
  menuItems: MenuItem<"default" | "leave">[];
  actionsButton?: React.ReactNode;
}

export const TaskControlCard = ({
  task,
  menuItems,
  actionsButton,
}: TaskControlCardProps) => {
  const statusConfig = getEntityStatusConfig(task.status);

  return (
    <div className={`${styles.taskControlCardWrapper} ${styles[task.status]}`}>
      <TaskCardBase
        task={task}
        topContent={
          <div
            className={styles.statusBadge}
            style={{ background: statusConfig.bg, color: statusConfig.color }}
          >
            <span className={styles.statusDot} />
            {statusConfig.label}
          </div>
        }
        middleContent={
          <Dropdown
            placement="top"
            shouldBlockScroll={false}
            classNames={{ content: styles.dropdownContent }}
          >
            <DropdownTrigger>
              <button
                className={styles.moreActionsButton}
                onClick={(e) => e.stopPropagation()}
              >
                <ActionsIcon className={styles.actionsIcon} />
              </button>
            </DropdownTrigger>
            <DropdownMenu>
              {menuItems.map((item) => (
                <DropdownItem
                  key={item.key}
                  onClick={item.onClick}
                  classNames={{
                    base: `${styles.menuItem} ${styles[item.variant ?? "default"]}`,
                    title: styles.menuItemTitle,
                  }}
                >
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        }
        endContent={<>{actionsButton}</>}
      />
    </div>
  );
};
