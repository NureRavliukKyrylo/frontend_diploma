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
  comment: TaskComment;
  menuItems: MenuItem<"edit" | "delete">[];
  replyButton?: React.ReactNode;
  className?: string;
}

export const TaskCommentItem = ({
  comment,
  replyButton,
  menuItems,
  className,
}: TaskCommentItemProps) => {
  return (
    <div className={`${styles.commentWrapper} ${className ?? ""}`}>
      <div className={styles.time}>{formatTimeAgo(comment.updatedAt)}</div>
      <Avatar
        className={styles.authorAvatar}
        src={comment.authorAvatarUrl}
        fallback={comment.authorName}
        variant="initials"
      />
      <div className={styles.bodyWrapper}>
        <div className={styles.initials}>
          <h1>{comment.authorName}</h1>
          <h2>{comment.authorRoleName}</h2>
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
        <p>{comment.body}</p>
        {replyButton}
      </div>
    </div>
  );
};
