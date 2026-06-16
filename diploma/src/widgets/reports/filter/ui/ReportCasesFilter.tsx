import { motion } from "framer-motion";
import { DateRangeFilter, SelectFilter } from "@shared/ui/filters";
import { BaseButtonWrapper, ShowMoreItemsButton } from "@shared/ui/buttons";
import { Tab } from "@shared/ui";
import { useReportCasesFilter } from "../model/useReportCasesFilter";
import {
  ModerationSubjectType,
  reportReasonLabels,
  reportReasons,
  type ReportCasesSearchParams,
} from "@entities/report";
import styles from "./ReportCasesFilter.module.scss";
import { BaseWrapperFilter } from "@shared/ui/wrappers";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Resolved", value: "resolved" },
  { label: "Rejected", value: "rejected" },
];

const subjectTypeItems = Object.keys(ModerationSubjectType) as Array<
  keyof typeof ModerationSubjectType
>;

interface ReportCasesFilterProps {
  search: ReportCasesSearchParams;
}

export const ReportCasesFilter = ({ search }: ReportCasesFilterProps) => {
  const {
    onReasonToggle,
    onSubjectTypeToggle,
    onStatusChange,
    onStartDateChange,
    onEndBeforeChange,
    onClearFilters,
  } = useReportCasesFilter();

  return (
    <BaseWrapperFilter>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h1 className={styles.subHeader}>Report Status</h1>
          <SelectFilter
            label="Status"
            options={statusOptions}
            value={search.Status ?? "all"}
            onChange={(val) => onStatusChange(val === "all" ? undefined : val)}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.block}>
          <h1 className={styles.subHeader}>Date range</h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.block}>
          <h1 className={styles.subHeader}>Report Reason</h1>
          <ShowMoreItemsButton
            items={reportReasons.map((reason) => (
              <Tab
                key={reason}
                name={reportReasonLabels[reason]}
                className={styles.filterTab}
                isSelected={search.Reasons?.includes(reason) ?? false}
                selectedClassName={styles.filterTabActive}
                onClick={() => onReasonToggle(reason)}
              />
            ))}
            classNameButton={styles.showMoreButton}
            buttonPosition="below"
            classNameItems={styles.itemsFilter}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.block}>
          <h1 className={styles.subHeader}>Subject type</h1>
          <ShowMoreItemsButton
            items={subjectTypeItems.map((type) => (
              <Tab
                key={type}
                name={type}
                className={styles.filterTab}
                isSelected={search.SubjectTypes?.includes(type) ?? false}
                selectedClassName={styles.filterTabActive}
                onClick={() => onSubjectTypeToggle(type)}
              />
            ))}
            classNameButton={styles.showMoreButton}
            buttonPosition="below"
            classNameItems={styles.itemsFilter}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.buttonClear}>
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={styles.animationButtonBlock}
          >
            <BaseButtonWrapper
              onClick={onClearFilters}
              className={styles.clearFiltersButton}
            >
              Clear Filters
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </div>
    </BaseWrapperFilter>
  );
};
