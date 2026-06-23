import type { ReactNode } from "react";
import { Avatar } from "@shared/ui";
import { useTranslation } from "react-i18next";
import styles from "./ChatContentWidget.module.scss";
import { useChatHeaderData } from "../model/useChatHeaderData";
import { MessageForm } from "@features/chat";
import {
  useChatScrollStore,
  type Message,
  type MessageModeType,
} from "@entities/chat";
import { getFullName } from "@entities/user";
import { useQuery } from "@tanstack/react-query";
import { profileQuery } from "@entities/user/profile";
import { AnimatePresence, motion } from "framer-motion";
import { NavigationArrow } from "@shared/assets/icons/actions";

interface ChatContentWidgetProps {
  chatId: string;
  children: ReactNode;
  leftContent?: ReactNode;
  mode: Record<
    MessageModeType,
    {
      isActive: boolean;
      message: Message | null;
    }
  >;
  onCancel: () => void;
}

export const ChatContentWidget = ({
  chatId,
  children,
  mode,
  onCancel,
  leftContent,
}: ChatContentWidgetProps) => {
  const { t } = useTranslation(["chat"]);
  const { data: chat } = useChatHeaderData(chatId);
  const { data: user } = useQuery(profileQuery.all());
  const participantsNotUser = chat.participants.filter(
    (participant) => participant.id != user?.id,
  );
  const initials = chat.name?.split(" ").slice(0, 2).join(" ") ?? "nothing";

  const isPrivate = chat.relatedEntityType === "private";
  const chipClassName = `${styles.chatTypeChip} ${styles[chat.relatedEntityType]}`;

  const notAtBottom = useChatScrollStore((s) => s.notAtBottom[chatId] ?? false);
  const requestScrollToBottom = useChatScrollStore(
    (s) => s.requestScrollToBottom,
  );

  return (
    <div className={styles.chatContentWrapper}>
      <div className={styles.chatHeader}>
        <div className={styles.avatarBack}>
          {leftContent}
          <Avatar
            className={styles.chatAvatar}
            src={chat.avatarUrl ?? undefined}
            fallback={initials}
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
      </div>
      <div className={styles.chatBody}>
        {children}
        <AnimatePresence>
          {notAtBottom && (
            <motion.button
              className={styles.scrollToBottom}
              onClick={() => requestScrollToBottom(chatId)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
            >
              <NavigationArrow />
              {chat.unreadCount > 0 && (
                <div className={styles.unreadCount}>
                  {chat.unreadCount >= 100 ? "99+" : chat.unreadCount}
                </div>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <MessageForm
        replyToMessage={
          mode.reply.isActive
            ? {
                id: mode.reply.message!.id,
                content: mode.reply.message!.message,
                sender: getFullName(
                  mode.reply.message?.sender.firstName,
                  mode.reply.message?.sender.lastName,
                ),
              }
            : null
        }
        editingMessage={
          mode.edit.isActive
            ? {
                id: mode.edit.message!.id,
                content: mode.edit.message!.message,
              }
            : null
        }
        onCancel={onCancel}
        participants={participantsNotUser}
        chatId={chatId}
        hideMentionButton={isPrivate}
      />
    </div>
  );
};
