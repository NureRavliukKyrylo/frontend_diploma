import { motion } from "framer-motion";
import { useReadAllNotifications } from "../model/useReadAllNotifications";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ReadAllNotificationsButton.module.scss";

export const ReadAllNotificationsButton = () => {
  const { readAllNotifications, isLoading } = useReadAllNotifications();

  return (
    <motion.div
      whileHover={{ opacity: 0.7 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <BaseButtonWrapper
        className={styles.button}
        onClick={readAllNotifications}
        disabled={isLoading}
      >
        Mark all as read
      </BaseButtonWrapper>
    </motion.div>
  );
};
