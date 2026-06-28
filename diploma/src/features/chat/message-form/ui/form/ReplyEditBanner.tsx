import { RejectIcon } from "@shared/assets/icons/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./MessageForm.module.scss";

interface ReplyEditBannerProps {
  isEditing: boolean;
  isReplying: boolean;
  replyToMessage?: { id: string; content: string; sender: string } | null;
  editingMessage?: { id: string; content: string } | null;
  onCancel?: () => void;
}

export const ReplyEditBanner = ({
  isEditing,
  isReplying,
  replyToMessage,
  editingMessage,
  onCancel,
}: ReplyEditBannerProps) => {
  const { t } = useTranslation(["chat"]);
  const showBanner = isEditing || isReplying;

  return (
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
  );
};
