import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { withDebounce } from "@shared/libs/hocs";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { DatePickerInput } from "@shared/ui/inputs";
import { Switch } from "@shared/ui";
import {
  organizationTaskSearchDefaults,
  organizationTaskStateOptions,
  type OrganizationTaskSearchState,
} from "../lib/helpers";
import filterStyles from "../../shared/filters/Filters.module.scss";

interface TaskFiltersProps {
  search: OrganizationTaskSearchState;
  onChange: (patch: Partial<OrganizationTaskSearchState>) => void;
  onReset: () => void;
}

export const TaskFilters = ({
  search,
  onChange,
  onReset,
}: TaskFiltersProps) => {
  const { t } = useTranslation("organizations");
  const DebouncedDatePicker = useMemo(
    () => withDebounce(DatePickerInput, 300),
    [],
  );

  const hasStateFilter =
    Boolean(search.State) &&
    search.State !== organizationTaskSearchDefaults.State;
  const hasDateFilter = Boolean(search.DueBefore);
  const hasMoreOptionsFilter = Boolean(
    search.OnlyAssigned || search.WithDueDateOnly,
  );

  return (
    <>
      <div className={filterStyles.scrollableProjectsFilters}>
        <div
          className={`${filterStyles.projectCategories} ${
            hasStateFilter ? filterStyles.filterSectionActive : ""
          }`}
        >
          <div className={filterStyles.sectionHeaderRow}>
            <h3 className={filterStyles.subHeaderFilter}>
              {t("details.tasks.filters.state")}
            </h3>
            {hasStateFilter && (
              <span className={filterStyles.activeBadge}>
                {t("details.tasks.filters.applied")}
              </span>
            )}
          </div>

          <div className={filterStyles.categoriesInfinite}>
            <div className={filterStyles.categoriesListFilter}>
              {organizationTaskStateOptions.map((option) => {
                const isActive = (search.State ?? "AllTasks") === option.value;

                return (
                  <BaseButtonWrapper
                    key={option.value}
                    onClick={() => onChange({ State: option.value })}
                    className={`${filterStyles.taskStateButton} ${
                      isActive ? filterStyles.taskStateButtonActive : ""
                    }`}
                  >
                    {t(option.labelKey)}
                  </BaseButtonWrapper>
                );
              })}
            </div>
          </div>
        </div>

        <div className={filterStyles.dividerFilterBlock} />

        <div
          className={`${filterStyles.projectDeadLine} ${
            hasDateFilter ? filterStyles.filterSectionActive : ""
          }`}
        >
          <div className={filterStyles.sectionHeaderRow}>
            <h3 className={filterStyles.subHeaderFilter}>
              {t("details.tasks.filters.dueDate")}
            </h3>
            {hasDateFilter && (
              <span className={filterStyles.activeBadge}>
                {t("details.tasks.filters.applied")}
              </span>
            )}
          </div>

          <div className={filterStyles.deadlineCalendarBlock}>
            <div className={`${filterStyles.startDate} ${filterStyles.singleDateField}`}>
              <h4>{t("details.tasks.filters.dueBefore")}</h4>
              <div className={filterStyles.dateStartInput}>
                <DebouncedDatePicker
                  label=""
                  showMonthAndYearPickers
                  name="organizationTaskDueBefore"
                  value={search.DueBefore}
                  onChange={(value) => onChange({ DueBefore: value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={filterStyles.dividerFilterBlock} />

        <div
          className={`${filterStyles.moreOptions} ${
            hasMoreOptionsFilter ? filterStyles.filterSectionActive : ""
          }`}
        >
          <div className={filterStyles.sectionHeaderRow}>
            <h3 className={filterStyles.subHeaderFilter}>
              {t("details.tasks.filters.more")}
            </h3>
            {hasMoreOptionsFilter && (
              <span className={filterStyles.activeBadge}>
                {t("details.tasks.filters.applied")}
              </span>
            )}
          </div>

          <div className={filterStyles.wrapperMoreOptionsFilter}>
            <div className={filterStyles.completedProject}>
              <h4 className={filterStyles.titleFilterMoreOptions}>
                {t("details.tasks.onlyAssigned")}
              </h4>
              <Switch
                isSelected={search.OnlyAssigned ?? false}
                onValueChange={(value) => onChange({ OnlyAssigned: value })}
                classNames={{
                  base: "scale-80 sm:scale-90 lg:scale-95",
                  wrapper:
                    "bg-[rgba(44,44,44,0.3)] group-data-[selected=true]:bg-[#8C0000]",
                  thumb: "w-[20px] h-[20px]",
                }}
              />
            </div>

            <div className={filterStyles.joinedProject}>
              <h4 className={filterStyles.titleFilterMoreOptions}>
                {t("details.tasks.onlyWithDueDate")}
              </h4>
              <Switch
                isSelected={search.WithDueDateOnly ?? false}
                onValueChange={(value) => onChange({ WithDueDateOnly: value })}
                classNames={{
                  base: "scale-80 sm:scale-90 lg:scale-95",
                  wrapper:
                    "bg-[rgba(44,44,44,0.3)] group-data-[selected=true]:bg-[#8C0000]",
                  thumb: "w-[20px] h-[20px]",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={filterStyles.dividerFilterBlock} />

      <div className={filterStyles.buttonClear}>
        <div className={filterStyles.animationButtonBlock}>
          <BaseButtonWrapper
            onClick={onReset}
            className={filterStyles.clearFiltersButton}
          >
            {t("details.tasks.filters.clear")}
          </BaseButtonWrapper>
        </div>
      </div>
    </>
  );
};
