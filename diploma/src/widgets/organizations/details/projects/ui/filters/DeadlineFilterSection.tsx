import type { ComponentType } from "react";
import type { ProjectSearchParams } from "@entities/project";
import styles from "../../../shared/filters/Filters.module.scss";
import { OrganizationProjectFiltersSection } from "./Section";

interface OrganizationProjectDeadlineFilterSectionProps {
  search: ProjectSearchParams;
  onChange: (patch: Partial<ProjectSearchParams>) => void;
  DateInput: ComponentType<any>;
}

export const OrganizationProjectDeadlineFilterSection = ({
  search,
  onChange,
  DateInput,
}: OrganizationProjectDeadlineFilterSectionProps) => {
  const hasDeadlineFilter = Boolean(search.StartDate || search.EndBefore);

  return (
    <OrganizationProjectFiltersSection
      title="Project deadline due"
      isActive={hasDeadlineFilter}
      badge={hasDeadlineFilter ? "Applied" : undefined}
      className={styles.projectDeadLine}
    >
      <div className={styles.deadlineCalendarBlock}>
        <div className={styles.startDate}>
          <h4>Start date</h4>
          <div className={styles.dateStartInput}>
            <DateInput
              label=""
              showMonthAndYearPickers
              name="startDate"
              value={search.StartDate}
              onChange={(value: string | undefined) =>
                onChange({ StartDate: value, Page: 1 })
              }
            />
          </div>
        </div>
        <div className={styles.dueDate}>
          <h4>Due date</h4>
          <div className={styles.dateDueInput}>
            <DateInput
              label=""
              showMonthAndYearPickers
              name="dueDate"
              value={search.EndBefore}
              onChange={(value: string | undefined) =>
                onChange({ EndBefore: value, Page: 1 })
              }
            />
          </div>
        </div>
      </div>
    </OrganizationProjectFiltersSection>
  );
};
