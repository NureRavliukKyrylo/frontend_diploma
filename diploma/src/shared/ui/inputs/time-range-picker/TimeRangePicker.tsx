import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import type { SingleInputTimeRangeFieldProps } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./TimeRangePicker.module.scss";

export const TimeRangePicker = (props: SingleInputTimeRangeFieldProps) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className={styles.timeRangePicker}>
      <SingleInputTimeRangeField {...props} />
    </div>
  </LocalizationProvider>
);
