import type { Chat } from "@entities/chat";
import { Avatar } from "@shared/ui";
import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ChatContentWidget.module.scss";

interface ChatHeaderProps {
  chat: Chat;
  leftContent?: ReactNode;
  onOpenDetails: () => void;
}

export const ChatHeader = ({
  chat,
  leftContent,
  onOpenDetails,
}: ChatHeaderProps) => {
  const { t } = useTranslation(["chat", "common"]);
  const initials = chat.name?.split(" ").slice(0, 2).join(" ") ?? "nothing";
  const isPrivate = chat.relatedEntityType === "private";
  const chipClassName = `${styles.chatTypeChip} ${styles[chat.relatedEntityType]}`;

  return (
    <div className={styles.chatHeader}>
      <div className={styles.avatarBack}>
        {leftContent}
        <Avatar
          className={styles.chatAvatar}
          src={chat.avatarUrl ?? undefined}
          fallback={initials}
          shape="rounded"
        />
      </div>
      <div className={styles.chatInfo}>
        <span className={styles.chatName}>{chat.name}</span>
        <div className={styles.chatMetaRow}>
          <span className={chipClassName}>
            {t(`chat:categories.${chat.relatedEntityType}`, {
              defaultValue: chat.relatedEntityType,
            })}
          </span>
          {!isPrivate && (
            <span className={styles.membersCount}>
              {t("labels.membersCount", {
                count: chat.participants.length,
              })}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        className={styles.detailsButton}
        aria-label={t("chat:details.open")}
        onClick={onOpenDetails}
      >
        <MoreHorizontal size={19} strokeWidth={2.8} aria-hidden="true" />
      </button>
    </div>
  );
};
