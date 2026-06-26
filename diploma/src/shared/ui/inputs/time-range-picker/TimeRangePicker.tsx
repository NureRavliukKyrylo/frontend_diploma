import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import type { SingleInputTimeRangeFieldProps } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/uk";
import styles from "./TimeRangePicker.module.scss";
import { useTranslation } from "react-i18next";

export const TimeRangePicker = (props: SingleInputTimeRangeFieldProps) => {
  const { i18n } = useTranslation();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.language === "uk" ? "uk" : "en"}
    >
      <div className={styles.timeRangePicker}>
        <SingleInputTimeRangeField {...props} />
      </div>
    </LocalizationProvider>
  );
};
