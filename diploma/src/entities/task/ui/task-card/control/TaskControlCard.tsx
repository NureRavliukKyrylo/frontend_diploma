import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ActionsIcon } from "@shared/assets/icons/actions";
import { motion } from "framer-motion";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import type { Task } from "../../../model";
import { TaskCardBase } from "../base/TaskCardBase";
import styles from "./TaskControlCard.module.scss";
import { getEntityStatusConfig } from "@shared/libs/entity";
import type { MenuItem } from "@shared/config/types";

interface TaskControlCardProps {
  task: Task;
  menuItems: MenuItem<"default" | "leave">[];
}

export const TaskControlCard = ({ task, menuItems }: TaskControlCardProps) => {
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
          <Dropdown placement="top" shouldBlockScroll={false}>
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
        endContent={
          <motion.div
            whileHover={{
              scale: 1.03,
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.getStartedButton}
          >
            <LinkButtonWrapper
              to="/tasks/$id"
              params={{ id: task.id }}
              className={styles.btnLink}
            >
              Get Started
            </LinkButtonWrapper>
          </motion.div>
        }
      />
    </div>
  );
};
