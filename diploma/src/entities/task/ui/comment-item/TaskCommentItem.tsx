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

interface TaskCommentItemProps {
  avatarUrl?: string;
  comment: TaskComment;
  menuItems: MenuItem<"edit" | "delete">[];
  replyButton?: React.ReactNode;
}

export const TaskCommentItem = ({
  comment,
  avatarUrl,
  replyButton,
  menuItems,
}: TaskCommentItemProps) => {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.time}>{formatTimeAgo(comment.updatedAt)}</div>
      <Avatar
        className={styles.authorAvatar}
        src={avatarUrl}
        fallback={comment.authorName}
      />
      <div className={styles.bodyWrapper}>
        <div className={styles.initials}>
          <h1>{comment.authorName}</h1>
          <h2>{comment.authorRoleName}</h2>
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
        </div>
        <p>{comment.body}</p>
        {replyButton}
      </div>
    </div>
  );
};
