import type { FormikProps } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import styles from "./MessageForm.module.scss";

interface ComposerTextareaProps {
  formik: FormikProps<{ body: string }>;
  isEditing: boolean;
  isLoading: boolean;
  hasError: boolean;
  canSend: boolean;
  editingMessage?: { id: string; content: string } | null;
  mentionChips: ReactNode;
  sendTyping: (value: boolean) => void;
}

export const ComposerTextarea = ({
  formik,
  isEditing,
  isLoading,
  hasError,
  canSend,
  editingMessage,
  mentionChips,
  sendTyping,
}: ComposerTextareaProps) => {
  const { t } = useTranslation(["chat"]);
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

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (
      editingMessage?.content &&
      formik.values.body === editingMessage.content
    ) {
      requestAnimationFrame(() => autoResize());
    }
  }, [formik.values.body, editingMessage?.content]);

  useEffect(() => {
    if (!formik.values.body) resetHeight();
  }, [formik.values.body]);

  return (
    <div className={styles.wrapperInputResult}>
      <div
        className={`${styles.inputWrapper} ${hasError ? styles.inputWrapperError : ""}`}
      >
        {mentionChips}
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
          onChange={(event) => {
            formik.handleChange(event);
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
            className={`${styles.sendMessage} ${canSend ? styles.ready : styles.empty} ${isLoading ? styles.loading : ""}`}
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
            <SendHorizontal
              className={styles.icon}
              size={21}
              strokeWidth={2.4}
              aria-hidden="true"
            />
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
  );
};
