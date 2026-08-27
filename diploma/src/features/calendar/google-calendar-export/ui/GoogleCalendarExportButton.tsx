import { motion } from "framer-motion";
import { GoogleCalendarIcon } from "@shared/assets/icons/info";
import { useGoogleCalendarExport } from "../model/useGoogleCalendarExport";
import styles from "./GoogleCalendarExportButton.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";

interface GoogleCalendarExportButtonProps {
  from: Date;
  to: Date;
}

export const GoogleCalendarExportButton = ({
  from,
  to,
}: GoogleCalendarExportButtonProps) => {
  const { t } = useTranslation(["calendar"]);
  const { exportToGoogleCalendar, isLoading } = useGoogleCalendarExport();

  return (
    <motion.div
      style={{ display: "inline-flex" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      <BaseButtonWrapper
        className={styles.exportButton}
        loading={isLoading}
        onClick={() => exportToGoogleCalendar(from, to)}
      >
        <img src={GoogleCalendarIcon} className={styles.icon} alt="" />
        {t("calendar:actions.exportGoogle")}
      </BaseButtonWrapper>
    </motion.div>
  );
};
