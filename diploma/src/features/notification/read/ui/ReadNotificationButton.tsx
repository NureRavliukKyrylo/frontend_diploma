import { motion } from "framer-motion";
import { useReadNotification } from "../model/useReadNotification";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ReadNotificationButton.module.scss";

interface ReadNotificationButtonProps {
  notificationId: string;
}

export const ReadNotificationButton = ({
  notificationId,
}: ReadNotificationButtonProps) => {
  const { readNotification, isLoading } = useReadNotification();

  return (
    <motion.div
      whileHover={{ opacity: 0.7 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <BaseButtonWrapper
        className={styles.button}
        onClick={() => readNotification(notificationId)}
        disabled={isLoading}
      >
        Mark as read
      </BaseButtonWrapper>
    </motion.div>
  );
};
