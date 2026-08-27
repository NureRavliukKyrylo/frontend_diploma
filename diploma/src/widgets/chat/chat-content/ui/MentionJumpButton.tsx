import {
  getMentionFeedMessageId,
  isUnreadMentionFeedItem,
  mentionQuery,
} from "@entities/chat";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./MentionJumpButton.module.scss";

interface MentionJumpButtonProps {
  chatId: string;
  onJump: (messageId: string) => void;
}

export const MentionJumpButton = ({
  chatId,
  onJump,
}: MentionJumpButtonProps) => {
  const { t } = useTranslation("chat");
  const { data: mentions } = useQuery(mentionQuery.forChat(chatId));
  const unreadMentionMessageIds = useMemo(
    () =>
      (mentions ?? [])
        .filter(isUnreadMentionFeedItem)
        .sort((a, b) => {
          const aTime = new Date(a.message.timestamp).getTime();
          const bTime = new Date(b.message.timestamp).getTime();
          return aTime - bTime;
        })
        .map(getMentionFeedMessageId)
        .filter((messageId): messageId is string => Boolean(messageId)),
    [mentions],
  );

  const unreadMentionCount = unreadMentionMessageIds.length;
  const firstMentionMessageId = unreadMentionMessageIds[0];

  if (!firstMentionMessageId || unreadMentionCount === 0) return null;

  return (
    <motion.button
      type="button"
      className={styles.mentionButton}
      aria-label={t("states.mentionJump")}
      title={t("states.mentionJump")}
      onClick={() => onJump(firstMentionMessageId)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.15 }}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.06 }}
    >
      <span className={styles.glyph} aria-hidden="true">
        @
      </span>
      {unreadMentionCount > 1 && (
        <AnimatePresence>
          <motion.span
            className={styles.badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {unreadMentionCount >= 100 ? "99+" : unreadMentionCount}
          </motion.span>
        </AnimatePresence>
      )}
    </motion.button>
  );
};
