import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./NotificationToast.module.scss";
import { useNotificationStore, type Notification } from "../../model";
import { NotificationItem } from "../notification-item/NotificationItem";

const TOAST_DURATION = 5000;

function ToastEntry({ notification }: { notification: Notification }) {
  const removeToast = useNotificationStore((s) => s.removeToast);

  useEffect(() => {
    const timer = setTimeout(
      () => removeToast(notification.id),
      TOAST_DURATION,
    );
    return () => clearTimeout(timer);
  }, [notification.id]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -60, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -60, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={styles.toast}
      onClick={() => removeToast(notification.id)}
    >
      <NotificationItem notification={notification} variant="toast" />
    </motion.div>
  );
}

export function NotificationToast() {
  const toasts = useNotificationStore((s) => s.toastNotifications);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="popLayout">
        {toasts.map((n) => (
          <ToastEntry key={n.id} notification={n} />
        ))}
      </AnimatePresence>
    </div>
  );
}
