import { motion, AnimatePresence } from "framer-motion";
import styles from "./MessageForm.module.scss";
import { RejectIcon, SendMessageIcon } from "@shared/assets/icons/actions";
import { useEffect, useRef, useState } from "react";
import { getFullName } from "@entities/user";
import { getMentionColor } from "@shared/config/constants";
import { useMessageForm } from "../../model/useMessageForm";
import { useTranslation } from "react-i18next";
import {
  MentionButton,
  type Participant,
} from "../mention-button/MentionButton";
import { useTypingMessage } from "@entities/chat";

interface MessageFormProps {
  chatId: string;
  participants?: Participant[];
  replyToMessage?: { id: string; content: string; sender: string } | null;
  mentionedUserIds?: string[];
  editingMessage?: { id: string; content: string } | null;
  hideMentionButton: boolean;
  onCancel?: () => void;
}

export const MessageForm = ({
  chatId,
  participants = [],
  replyToMessage,
  mentionedUserIds = [],
  editingMessage,
  onCancel,
  hideMentionButton,
}: MessageFormProps) => {
  const { t } = useTranslation(["chat"]);
  const isEditing = Boolean(editingMessage);
  const isReplying = Boolean(replyToMessage) && !isEditing;
  const showBanner = isEditing || isReplying;

  const [mentionIds, setMentionIds] = useState<string[]>(mentionedUserIds);

  const { formik, isLoading } = useMessageForm({
    chatId,
    replyToMessageId: replyToMessage?.id,
    mentionedUserIds: mentionIds,
    editingMessage,
    onCancel,
  });

  const sendTyping = useTypingMessage(chatId);

  const hasError = formik.submitCount > 0 && Boolean(formik.errors.body);
  const isBlank = !formik.values.body.trim();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const resetHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isBlank) formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (!formik.values.body) resetHeight();
  }, [formik.values.body]);

  const toggleMention = (id: string) => {
    setMentionIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const removeMention = (id: string) => {
    setMentionIds((prev) => prev.filter((m) => m !== id));
  };

  const mentionedParticipants = participants.filter((p) =>
    mentionIds.includes(p.id),
  );

  return (
    <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className={`${styles.banner} ${isEditing ? styles.editingBanner : styles.replyingBanner}`}
            initial={{ opacity: 0, scaleY: 0.8, originY: 1 }}
            animate={{ opacity: 1, scaleY: 1, originY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8, originY: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className={styles.bannerContent}>
              <span className={styles.bannerLabel}>
                {isEditing
                  ? t("chat:banners.editing")
                  : t("chat:banners.replying", {
                      sender: replyToMessage?.sender,
                    })}
              </span>
              <p className={styles.bannerText}>
                {isEditing ? editingMessage?.content : replyToMessage?.content}
              </p>
            </div>
            <motion.button
              type="button"
              className={styles.bannerClose}
              onClick={onCancel}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <RejectIcon className={styles.bannerCloseIcon} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mentionedParticipants.length > 0 && (
          <motion.div
            className={styles.mentionTags}
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {mentionedParticipants.map((p) => {
              const fullName = getFullName(p.firstName, p.lastName);
              return (
                <span
                  key={p.id}
                  className={styles.mentionTag}
                  style={{ background: getMentionColor(fullName) }}
                >
                  @{fullName}
                  <button
                    type="button"
                    className={styles.mentionTagRemove}
                    onClick={() => removeMention(p.id)}
                  >
                    <RejectIcon className={styles.mentionTagRemoveIcon} />
                  </button>
                </span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.sendMessageWrapper}>
        {!hideMentionButton && (
          <MentionButton
            participants={participants}
            mentionIds={mentionIds}
            onToggle={toggleMention}
          />
        )}

        <div className={styles.wrapperInputResult}>
          <div className={styles.inputWrapper}>
            <motion.textarea
              ref={textareaRef}
              id="body"
              name="body"
              rows={1}
              value={formik.values.body}
              placeholder={
                isEditing
                  ? t("chat:form.placeholderEdit")
                  : t("chat:form.placeholderSend")
              }
              onChange={(e) => {
                formik.handleChange(e);
                autoResize();
                sendTyping(true);
              }}
              onBlur={() => {
                formik.handleBlur;
                sendTyping(false);
              }}
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
