import { ChatIcon } from "@shared/assets/icons/info";
import { useCreatePrivateChat } from "../model/useCreatePrivateChat";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import styles from "./PrivateChatButton.module.scss";
import { useTranslation } from "react-i18next";

interface PrivateChatButtonProps {
  userId: string;
  className?: string;
}

export const PrivateChatButton = ({
  userId,
  className,
}: PrivateChatButtonProps) => {
  const { t } = useTranslation(["chat"]);
  const { createPrivateChat, isLoading } = useCreatePrivateChat();

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <BaseButtonWrapper
        className={`${styles.button} ${className ?? ""}`}
        loading={isLoading}
        onClick={() => createPrivateChat(userId)}
      >
        <ChatIcon className={styles.icon} /> {t("chat:actions.sendMessage")}
      </BaseButtonWrapper>
    </motion.div>
  );
};
