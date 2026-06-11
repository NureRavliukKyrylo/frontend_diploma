import { Avatar } from "@shared/ui";
import type { Chat } from "../../model";
import styles from "./ChatItem.module.scss";
import { OnlineIcon } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";

interface ChatItemProps {
  chat: Chat;
  typing?: string;
  isOnline?: string;
}

export const ChatItem = ({ chat, typing, isOnline }: ChatItemProps) => {
  return (
    <div className={styles.chatWrapper}>
      <Avatar className={styles.chatAvatar} src={chat.avatarUrl ?? undefined} />
      {isOnline && <OnlineIcon className={styles.onlineIcon} />}
      <div className={styles.rightContent}>
        <div className={styles.topContent}>
          <h1> {chat.name}</h1>
          <h2>{formatDateToText(chat.lastMessageAt, true)}</h2>
        </div>
        <div className={styles.bottomContent}>
          <p className={`${styles.lastMessage} ${typing ? styles.typing : ""}`}>
            {typing
              ? "typing..."
              : (chat.lastMessage?.message ?? "No messages yet")}
          </p>
          <span className={styles.unreadCount}>{chat.unreadCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
};
