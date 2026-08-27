import type { Task } from "@entities/task/model";
import type { MenuItem } from "@shared/config/types";
import styles from "./TaskBoardControlItem.module.scss";
import { TaskBoardItemBase } from "../base/TaskBoardItemBase";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ActionsIcon } from "@shared/assets/icons/actions";

interface TaskBoardControlItemProps {
  task: Task;
  menuItems: MenuItem<"default" | "leave" | "changeStatus">[];
}

export const TaskBoardControlItem = ({
  task,
  menuItems,
}: TaskBoardControlItemProps) => (
  <div className={styles.taskBoardControlItemwrapper}>
    <div className={styles.actionsAnchor}>
      <Dropdown
        placement="bottom-end"
        shouldBlockScroll={false}
        classNames={{ content: styles.dropdownContent }}
      >
        <DropdownTrigger>
          <button
            className={styles.actionsButton}
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
    </div>

    <TaskBoardItemBase task={task} />
  </div>
);
