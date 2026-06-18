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
      adapterLocale={i18n.language === "ua" ? "uk" : "en"}
    >
      <div className={styles.timeRangePicker}>
        <SingleInputTimeRangeField
          format={i18n.language === "ua" ? "гг:мм" : "hh:mm"}
          {...props}
        />
      </div>
    </LocalizationProvider>
  );
};
