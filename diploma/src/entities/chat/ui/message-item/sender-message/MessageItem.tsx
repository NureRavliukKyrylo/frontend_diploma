import { Avatar } from "@shared/ui";
import { EditIcon, ApproveIcon } from "@shared/assets/icons/actions";
import { formatDateToText } from "@shared/libs/date";
import { getFullName } from "@entities/user";
import type { Message } from "../../../model";
import styles from "./MessageItem.module.scss";
import { getMentionColor } from "@shared/config/constants";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import type { MenuItem } from "@shared/config/types";
import { useTranslation } from "react-i18next";

interface MessageItemProps {
  message: Message;
  menuItems: MenuItem<"default" | "edit" | "delete" | "reply" | "report">[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

export const MessageItem = ({
  message,
  menuItems,
  openId,
  setOpenId,
}: MessageItemProps) => {
  const isOpen = openId === message.id;

  const senderName = getFullName(
    message.sender.firstName,
    message.sender.lastName,
  );

  const { i18n } = useTranslation();
  return (
    <div
      className={`${styles.messageWrapper} ${message.isMine ? styles.mine : ""}`}
      onContextMenu={(e) => {
        e.preventDefault();
        setOpenId(message.id);
      }}
    >
      {!message.isMine && (
        <Avatar
          className={styles.avatar}
          fallback={senderName}
          src={message.sender.avatarUrl}
        />
      )}

      <div className={styles.bubble}>
        <Dropdown
          isOpen={isOpen}
          onOpenChange={(open) => setOpenId(open ? message.id : null)}
          placement={message.isMine ? "bottom-end" : "top-start"}
          shouldBlockScroll={false}
          classNames={{ content: styles.dropdownContent }}
        >
          <DropdownTrigger>
            <span className={styles.dropdownAnchor} />
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

        {!message.isMine && (
          <div className={styles.initialsBlock}>
            <span className={styles.name}>{senderName}</span>
            <span className={styles.roleName}>{message.sender.roleName}</span>
          </div>
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
              {formatDateToText(
                message.editedAt,
                i18n.language as "en" | "uk",
                true,
              )}
            </span>
          ) : (
            <span className={styles.timestamp}>
              {formatDateToText(
                message.timestamp,
                i18n.language as "en" | "uk",
                true,
              )}
            </span>
          )}
          {message.isMine && (
            <div className={styles.readStatus}>
              <ApproveIcon
                className={`${styles.checkIcon} ${message.readStatus === "Read" ? styles.checkRead : ""}`}
              />
              {message.readStatus === "Read" && (
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
