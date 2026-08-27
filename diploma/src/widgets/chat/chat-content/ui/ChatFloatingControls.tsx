import { Avatar } from "@shared/ui";
import { NavigationArrow } from "@shared/assets/icons/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MentionJumpButton } from "./MentionJumpButton";
import styles from "./ChatContentWidget.module.scss";

interface ChatFloatingControlsProps {
  chatId: string;
  isTyping: boolean;
  typingAvatarUrl?: string;
  typingName: string;
  notAtBottom: boolean;
  unreadCount: number;
  onScrollToBottom: () => void;
  onScrollToMessage: (messageId: string) => void;
}

export const ChatFloatingControls = ({
  chatId,
  isTyping,
  typingAvatarUrl,
  typingName,
  notAtBottom,
  unreadCount,
  onScrollToBottom,
  onScrollToMessage,
}: ChatFloatingControlsProps) => {
  const { t } = useTranslation(["chat"]);

  return (
    <>
      <MentionJumpButton chatId={chatId} onJump={onScrollToMessage} />
      <AnimatePresence>
        {isTyping && (
          <motion.div
            className={styles.typingIndicator}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.16 }}
          >
            <Avatar
              className={styles.typingAvatar}
              src={typingAvatarUrl}
              fallback={typingName}
              shape="rounded"
            />
            <div className={styles.typingBubble} aria-label={t("chat:states.typing")}>
              <span />
              <span />
              <span />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {notAtBottom && (
          <motion.button
            className={styles.scrollToBottom}
            onClick={onScrollToBottom}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
          >
            <NavigationArrow />
            {unreadCount > 0 && (
              <div className={styles.unreadCount}>
                {unreadCount >= 100 ? "99+" : unreadCount}
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
