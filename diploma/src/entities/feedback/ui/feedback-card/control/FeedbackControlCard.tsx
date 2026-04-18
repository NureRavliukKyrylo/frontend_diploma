import type { Feedback } from "@entities/feedback/model";
import type { MenuItem } from "@shared/config/types";
import styles from "./FeedbackControlCard.module.scss";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { MoreActionsIcon } from "@shared/assets/icons/actions";
import { FeedbackBase } from "../base/FeedbackBase";

interface FeedbackControlCardProps {
  feedback: Feedback;
  menuItems: MenuItem<"default" | "edit" | "leave">[];
  displayName?: string;
}

export const FeedbackControlCard = ({
  feedback,
  menuItems,
  displayName,
}: FeedbackControlCardProps) => {
  return (
    <div className={styles.feedbackControlWrapper}>
      <Dropdown placement="top-start" shouldBlockScroll={false}>
        <DropdownTrigger>
          <button
            className={styles.moreActionsButton}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={MoreActionsIcon} alt="more-actions" />
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
      <FeedbackBase feedback={feedback} displayName={displayName} />
    </div>
  );
};
