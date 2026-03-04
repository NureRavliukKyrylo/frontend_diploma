import { DatePickerInput } from "@shared/ui/inputs";
import styles from "./ProjectFilters.module.scss";
import { useNavigate } from "@tanstack/react-router";
import type { ProjectSearchParams } from "@entities/project";
import type { NavigateParams } from "../model/NavigateParams";

interface ProjectDeadlineProps {
  search: ProjectSearchParams;
  from: NavigateParams;
}

export const ProjectDeadlineFilter = ({
  search,
  from,
}: ProjectDeadlineProps) => {
  const navigate = useNavigate({ from });

  return (
    <div className={styles.deadlineCalendarBlock}>
      <div className={styles.startDate}>
        <h2>Start date</h2>
        <div className={styles.dateStartInput}>
          <DatePickerInput
            label=""
            showMonthAndYearPickers
            name="startDate"
            value={search.StartDate}
            onChange={(date) => {
              navigate({
                search: (prev) => ({ ...prev, StartDate: date }),
                resetScroll: false,
              });
            }}
          />
        </div>
      </div>
      <div className={styles.dueDate}>
        <h2>Due date</h2>
        <div className={styles.dateDueInput}>
          <DatePickerInput
            label=""
            showMonthAndYearPickers
            name="dueDate"
            value={search.EndBefore}
            onChange={(date) => {
              navigate({
                search: (prev) => ({ ...prev, EndBefore: date }),
                resetScroll: false,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
