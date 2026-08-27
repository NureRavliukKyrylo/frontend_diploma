import { Avatar } from "@shared/ui";
import type { TaskComment } from "../../model";
import styles from "./TaskCommentItem.module.scss";
import { formatTimeAgo } from "@shared/libs/date";
import type { MenuItem } from "@shared/config/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ActionsIcon } from "@shared/assets/icons/actions";
import { AnimatePresence, motion } from "framer-motion";
import { getFullName } from "@entities/user";
import { useTranslation } from "react-i18next";

interface TaskCommentItemProps {
  comment: TaskComment;
  menuItems: MenuItem<"edit" | "delete">[];
  replyButton?: React.ReactNode;
  className?: string;
  editSlot?: React.ReactNode;
  reportSlot?: React.ReactNode;
}

export const TaskCommentItem = ({
  comment,
  replyButton,
  menuItems,
  className,
  editSlot,
  reportSlot,
}: TaskCommentItemProps) => {
  const { t } = useTranslation(["common", "task"]);
  return (
    <div className={`${styles.commentWrapper} ${className ?? ""}`}>
      <div className={styles.time}>{formatTimeAgo(comment.createdAt, t)}</div>
      <Avatar
        className={styles.authorAvatar}
        src={comment.author.avatarUrl}
        fallback={getFullName(
          comment.author.firstName,
          comment.author.lastName,
        )}
      />
      <div className={styles.bodyWrapper}>
        <div className={styles.initials}>
          <h1>
            {getFullName(comment.author.firstName, comment.author.lastName)}
          </h1>
          <h2>{comment.author.roleName}</h2>
          {reportSlot}
          {menuItems.length > 0 && (
            <Dropdown
              placement="top-start"
              shouldBlockScroll={false}
              classNames={{ content: styles.dropdownContent }}
            >
              <DropdownTrigger>
                <button className={styles.moreActionsButton}>
                  <ActionsIcon className={styles.actionsIcon} />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                {menuItems.map((item) => (
                  <DropdownItem
                    key={item.key}
                    onClick={item.onClick}
                    classNames={{
                      base: `${styles.menuItem} ${styles[item.variant ?? "edit"]}`,
                      title: styles.menuItemTitle,
                    }}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <AnimatePresence mode="wait">
          {editSlot ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {editSlot}
            </motion.div>
          ) : comment.isDeleted ? (
            <p className={styles.deletedContent}>
              {t("task:comments.deletedComment")}
            </p>
          ) : (
            <p>{comment.body}</p>
          )}
        </AnimatePresence>
        {replyButton}
      </div>
    </div>
  );
};
