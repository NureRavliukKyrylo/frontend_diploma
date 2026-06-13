import { motion, AnimatePresence } from "framer-motion";
import styles from "./MessageForm.module.scss";
import {
  MentionIcon,
  RejectIcon,
  SendMessageIcon,
} from "@shared/assets/icons/actions";
import { useMessageForm } from "../model/useMessageForm";

interface MessageFormProps {
  chatId: string;
  replyToMessage?: { id: string; content: string } | null;
  mentionedUserIds?: string[];
  editingMessage?: { id: string; content: string } | null;
  onCancel?: () => void;
}

export const MessageForm = ({
  chatId,
  replyToMessage,
  mentionedUserIds,
  editingMessage,
  onCancel,
}: MessageFormProps) => {
  const isEditing = Boolean(editingMessage);
  const isReplying = Boolean(replyToMessage) && !isEditing;
  const showBanner = isEditing || isReplying;

  const { formik, isLoading } = useMessageForm({
    chatId,
    replyToMessageId: replyToMessage?.id,
    mentionedUserIds,
    editingMessage,
    onEditComplete: onCancel,
  });

  const hasError = formik.submitCount > 0 && Boolean(formik.errors.body);
  const isBlank = !formik.values.body.trim();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isBlank) {
        formik.handleSubmit();
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className={`${styles.banner} ${isEditing ? styles.editingBanner : styles.replyingBanner}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.bannerContent}>
              <span className={styles.bannerLabel}>
                {isEditing ? "Editing message" : "Replying to"}
              </span>
              <p className={styles.bannerText}>
                {isEditing ? editingMessage?.content : replyToMessage?.content}
              </p>
            </div>
            <button
              type="button"
              className={styles.bannerClose}
              onClick={onCancel}
            >
              <RejectIcon className={styles.bannerCloseIcon} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.sendMessageWrapper}>
        <button type="button" className={styles.mentionButton}>
          <MentionIcon className={styles.mentionIcon} />
        </button>
        <div className={styles.inputWrapper}>
          <motion.input
            id="body"
            name="body"
            type="text"
            value={formik.values.body}
            placeholder={isEditing ? "Edit message..." : "Send Message..."}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={handleKeyDown}
            className={`${styles.input} ${hasError ? styles.inputError : ""}`}
            animate={hasError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
          />

          <div className={styles.sendMessageButton}>
            <motion.button
              className={`${styles.sendMessage} ${isLoading ? styles.loading : ""}`}
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                mass: 0.5,
              }}
            >
              <SendMessageIcon className={styles.icon} />
            </motion.button>
          </div>

          <AnimatePresence>
            {hasError && (
              <motion.div
                className={styles.errorMessage}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {formik.errors.body}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
};
