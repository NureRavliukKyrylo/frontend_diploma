import { DatePickerInput } from "@shared/ui/inputs";
import styles from "./DateRangeFilter.module.scss";
import { withDebounce } from "@shared/libs/hocs";

const DebouncedDatePicker = withDebounce(DatePickerInput, 300);

interface DateRangeFilterProps {
  startDate?: string;
  endBefore?: string;
  onStartDateChange: (date: string | undefined) => void;
  onEndBeforeChange: (date: string | undefined) => void;
}

export const DateRangeFilter = ({
  startDate,
  endBefore,
  onStartDateChange,
  onEndBeforeChange,
}: DateRangeFilterProps) => {
  return (
    <div className={styles.deadlineCalendarBlock}>
      <div className={styles.startDate}>
        <h2>Start date</h2>
        <div className={styles.dateStartInput}>
          <DebouncedDatePicker
            label=""
            showMonthAndYearPickers
            name="startDate"
            value={startDate}
            onChange={(value) => onStartDateChange(value)}
          />
        </div>
      </div>
      <div className={styles.dueDate}>
        <h2>Due date</h2>
        <div className={styles.dateDueInput}>
          <DebouncedDatePicker
            label=""
            showMonthAndYearPickers
            name="dueDate"
            value={endBefore}
            onChange={(value) => onEndBeforeChange(value)}
          />
        </div>
      </div>
    </div>
  );
};
