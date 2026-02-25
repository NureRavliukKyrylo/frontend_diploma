import { DatePickerInput } from "@shared/ui/inputs";
import styles from "./ProjectFilters.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const ProjectDeadlineFilter = () => {
  const navigate = useNavigate({ from: "/projects/" });
  const search = useSearch({ from: "/_masterLayout/projects/" });

  return (
    <div className={styles.projectDeadLine}>
      <h1 className={styles.subHeaderFilter}>Project deadline due</h1>
      <div className={styles.deadlineCalendarBlock}>
        <div className={styles.startDate}>
          <h2>Start date</h2>
          <div className={styles.dateStartInput}>
            <DatePickerInput
              label=""
              showMonthAndYearPickers
              name="startDate"
              value={search.startDate}
              onChange={(date) => {
                navigate({
                  search: (prev) => ({ ...prev, startDate: date }),
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
              value={search.endBefore}
              onChange={(date) => {
                navigate({
                  search: (prev) => ({ ...prev, endBefore: date }),
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
