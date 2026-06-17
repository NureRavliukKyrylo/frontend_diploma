import { motion } from "framer-motion";
import { BaseButtonWrapper } from "../../base-buttons/base-wrapper/BaseButtonWrapper";
import styles from "./LoadMoreButton.module.scss";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface LoadMoreButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
  label?: string;
}

export const LoadMoreButton = ({
  onClick,
  isLoading,
  className,
  label,
}: LoadMoreButtonProps) => {
  const { t } = useTranslation(["common"]);

  const buttonLabel = label ?? t("common:pagination.loadMore").toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: isLoading ? 1 : 1.04 }}
      whileTap={{ scale: isLoading ? 1 : 0.97 }}
    >
      <BaseButtonWrapper
        onClick={onClick}
        disabled={isLoading}
        loading={isLoading}
        className={clsx(styles.loadMoreButton, className)}
      >
        {buttonLabel}
      </BaseButtonWrapper>
    </motion.div>
  );
};
