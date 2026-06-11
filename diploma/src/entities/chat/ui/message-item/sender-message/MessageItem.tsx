import { Avatar } from "@shared/ui";
import { EditIcon, ApproveIcon } from "@shared/assets/icons/actions";
import { formatDateToText } from "@shared/libs/date";
import { getFullName } from "@entities/user";
import type { Message } from "../../../model";
import styles from "./MessageItem.module.scss";
import { getMentionColor } from "@shared/config/constants";

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  const senderName = getFullName(
    message.sender.firstName,
    message.sender.lastName,
  );

  return (
    <div
      className={`${styles.messageWrapper} ${message.isMine ? styles.mine : ""}`}
    >
      {!message.isMine && (
        <Avatar
          className={styles.avatar}
          fallback={senderName}
          src={message.sender.avatarUrl}
        />
      )}
      <div className={styles.bubble}>
        {!message.isMine && (
          <span className={styles.roleName}>{message.sender.roleName}</span>
        )}
        {message.replyTo && (
          <div className={styles.replyBlock}>
            <span className={styles.replyName}>
              {getFullName(message.replyTo.firstName, message.replyTo.lastName)}
            </span>
            <p className={styles.replyMessage}>{message.replyTo.message}</p>
          </div>
        )}
        {message.mentions.length > 0 && (
          <div className={styles.mentions}>
            {message.mentions.map((mention) => {
              const fullName = getFullName(mention.firstName, mention.lastName);
              return (
                <span
                  key={fullName}
                  className={styles.mention}
                  style={{ background: getMentionColor(fullName) }}
                >
                  @{fullName}
                </span>
              );
            })}
          </div>
        )}
        <p className={styles.message}>{message.message}</p>
        <div className={styles.meta}>
          {message.editedAt ? (
            <span className={styles.edited}>
              <EditIcon className={styles.editIcon} />
              {formatDateToText(message.editedAt, true)}
            </span>
          ) : (
            <span className={styles.timestamp}>
              {formatDateToText(message.timestamp, true)}
            </span>
          )}
          {message.isMine && (
            <div className={styles.readStatus}>
              <ApproveIcon className={styles.checkIcon} />
              {message.isRead && (
                <ApproveIcon
                  className={`${styles.checkIcon} ${styles.checkRead}`}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
