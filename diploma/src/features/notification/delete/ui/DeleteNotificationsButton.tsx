import { motion } from "framer-motion";
import { useDeleteNotifications } from "../model/useDeleteNotifications";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { RejectIcon } from "@shared/assets/icons/actions";
import styles from "./DeleteNotificationsButton.module.scss";

interface DeleteNotificationsButtonProps {
  ids: string[];
  onSuccess?: () => void;
  onDeleteTrigger?: () => void;
}

export const DeleteNotificationsButton = ({
  ids,
  onSuccess,
  onDeleteTrigger,
}: DeleteNotificationsButtonProps) => {
  const { deleteNotifications, isLoading } = useDeleteNotifications({
    onSuccess,
  });

  const handleClick = () => {
    onDeleteTrigger?.();
    setTimeout(() => deleteNotifications(ids), 500);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BaseButtonWrapper
        className={styles.deleteButton}
        onClick={handleClick}
        disabled={isLoading}
      >
        <RejectIcon className={styles.icon} />
        {isLoading ? "Deleting..." : `Delete (${ids.length})`}
      </BaseButtonWrapper>
    </motion.div>
  );
};
