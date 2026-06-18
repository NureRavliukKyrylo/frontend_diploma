import { Avatar } from "@shared/ui";
import type { Chat } from "../../model";
import styles from "./ChatItem.module.scss";
import { OnlineIcon } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";
import { useTranslation } from "react-i18next";

interface ChatItemProps {
  chat: Chat;
  typing?: string;
  isOnline?: string;
}

export const ChatItem = ({ chat, typing, isOnline }: ChatItemProps) => {
  const { t } = useTranslation(["chat"]);

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
              ? t("chat:states.typing")
              : (chat.lastMessage?.message ?? t("chat:states.noMessages"))}
          </p>
          <span className={styles.unreadCount}>{chat.unreadCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
};
