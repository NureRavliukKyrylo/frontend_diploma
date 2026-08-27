import { motion } from "framer-motion";
import { useReadAllNotifications } from "../model/useReadAllNotifications";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";
import styles from "./ReadAllNotificationsButton.module.scss";

export const ReadAllNotificationsButton = () => {
  const { t } = useTranslation(["notification"]);
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
        {t("notification:actions.markAllAsRead")}
      </BaseButtonWrapper>
    </motion.div>
  );
};
