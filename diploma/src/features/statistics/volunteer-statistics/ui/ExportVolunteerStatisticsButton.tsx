import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useExportStatistics } from "../model/useExportStatistics";
import { ExportIcon } from "@shared/assets/icons/actions";
import styles from "./ExportVolunteerStatisticsButton.module.scss";
import { useTranslation } from "react-i18next";

export const ExportVolunteerStatisticsButton = () => {
  const { mutate, isPending } = useExportStatistics();
  const { t } = useTranslation("profile");

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <BaseButtonWrapper
        className={styles.button}
        onClick={() => mutate()}
        loading={isPending}
      >
        <ExportIcon className={styles.icon} />
        {t("statistics.export.button")}
      </BaseButtonWrapper>
    </motion.div>
  );
};
