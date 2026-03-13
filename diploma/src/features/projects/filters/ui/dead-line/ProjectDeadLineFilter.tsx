import { DatePickerInput } from "@shared/ui/inputs";
import styles from "./ProjectDeadlineFilter.module.scss";
import { useNavigate } from "@tanstack/react-router";
import type { ProjectSearchParams } from "@entities/project";
import type { NavigateParams } from "../../model/NavigateParams";
import { withDebounce } from "@shared/libs/hocs";

interface ProjectDeadlineProps {
  search: ProjectSearchParams;
  from: NavigateParams;
}

export const ProjectDeadlineFilter = ({
  search,
  from,
}: ProjectDeadlineProps) => {
  const navigate = useNavigate({ from });
  const DebouncedDatePicker = withDebounce(DatePickerInput, 300);

  return (
    <div className={styles.deadlineCalendarBlock}>
      <div className={styles.startDate}>
        <h2>Start date</h2>
        <div className={styles.dateStartInput}>
          <DebouncedDatePicker
            label=""
            showMonthAndYearPickers
            name="startDate"
            value={search.StartDate}
            onChange={(date) => {
              navigate({
                search: (prev) => ({ ...prev, StartDate: date, Page: 1 }),
                resetScroll: false,
              });
            }}
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
            value={search.EndBefore}
            onChange={(date) => {
              navigate({
                search: (prev) => ({ ...prev, EndBefore: date, Page: 1 }),
                resetScroll: false,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
