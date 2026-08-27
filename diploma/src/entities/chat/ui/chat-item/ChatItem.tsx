import { Avatar } from "@shared/ui";
import type { Chat } from "../../model";
import styles from "./ChatItem.module.scss";
import { OnlineIcon } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";
import { useTranslation } from "react-i18next";
import { useChatStore } from "@entities/chat/model/store/useChatStore";

interface ChatItemProps {
  chat: Chat;
  isOnline?: string;
  isActive?: boolean;
}

export const ChatItem = ({ chat, isOnline, isActive = false }: ChatItemProps) => {
  const { t, i18n } = useTranslation(["chat"]);
  const initials = chat.name?.split(" ").slice(0, 2).join(" ") ?? "nothing";
  const typing = useChatStore((s) => s.typingByChat[chat.id]);
  const mentionCount = chat.mentionCount ?? 0;

  return (
    <div
      className={`${styles.chatWrapper} ${isActive ? styles.active : ""}`}
    >
      <Avatar
        className={styles.chatAvatar}
        src={chat.avatarUrl ?? undefined}
        fallback={initials}
        shape="rounded"
      />
      {isOnline && <OnlineIcon className={styles.onlineIcon} />}
      <div className={styles.rightContent}>
        <div className={styles.topContent}>
          <h1>{chat.name}</h1>
          {chat.lastMessage?.timestamp && (
            <h2>
              {formatDateToText(
                chat.lastMessage?.timestamp,
                i18n.language as "en" | "uk",
                true,
              )}
            </h2>
          )}
        </div>
        <div className={styles.bottomContent}>
          <p className={`${styles.lastMessage} ${typing ? styles.typing : ""}`}>
            {typing
              ? t("chat:states.typing")
              : (chat.lastMessage?.message ?? t("chat:states.noMessages"))}
          </p>
          {(mentionCount > 0 || chat.unreadCount !== 0) && (
            <span className={styles.badges}>
              {mentionCount > 0 && (
                <span className={styles.mentionCount}>
                  @{mentionCount >= 100 ? "99+" : mentionCount}
                </span>
              )}
              {chat.unreadCount !== 0 && (
                <span className={styles.unreadCount}>{chat.unreadCount}</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
