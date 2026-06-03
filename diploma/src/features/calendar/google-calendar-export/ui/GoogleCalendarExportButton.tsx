import { GoogleCalendarIcon } from "@shared/assets/icons/info";
import { useGoogleCalendarExport } from "../model/useGoogleCalendarExport";
import styles from "./GoogleCalendarExportButton.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface GoogleCalendarExportButtonProps {
  from: Date;
  to: Date;
}

export const GoogleCalendarExportButton = ({
  from,
  to,
}: GoogleCalendarExportButtonProps) => {
  const { exportToGoogleCalendar, isLoading } = useGoogleCalendarExport();

  return (
    <BaseButtonWrapper
      className={styles.exportButton}
      loading={isLoading}
      onClick={() => exportToGoogleCalendar(from, to)}
    >
      <img src={GoogleCalendarIcon} className={styles.icon} />
      Export to Google Calendar
    </BaseButtonWrapper>
  );
};
