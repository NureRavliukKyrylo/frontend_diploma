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
  const { t, i18n } = useTranslation(["chat"]);
  const initials = chat.name?.split(" ").slice(0, 2).join(" ") ?? "nothing";

  return (
    <div className={styles.chatWrapper}>
      <Avatar
        className={styles.chatAvatar}
        src={chat.avatarUrl ?? undefined}
        fallback={initials}
      />
      {isOnline && <OnlineIcon className={styles.onlineIcon} />}
      <div className={styles.rightContent}>
        <div className={styles.topContent}>
          <h1> {chat.name}</h1>
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
          {chat.unreadCount !== 0 && (
            <span className={styles.unreadCount}>{chat.unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};
