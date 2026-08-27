import { motion } from "framer-motion";
import { DateRangeFilter, SelectFilter } from "@shared/ui/filters";
import { BaseButtonWrapper, ShowMoreItemsButton } from "@shared/ui/buttons";
import { Tab } from "@shared/ui";
import { useReportCasesFilter } from "../model/useReportCasesFilter";
import {
  ModerationSubjectType,
  ReportReasonType,
  type ReportCasesSearchParams,
} from "@entities/report";
import styles from "./ReportCasesFilter.module.scss";
import { BaseWrapperFilter } from "@shared/ui/wrappers";
import { useTranslation } from "react-i18next";

const subjectTypeItems = Object.keys(ModerationSubjectType) as Array<
  keyof typeof ModerationSubjectType
>;

const reportReasonItems = Object.keys(ReportReasonType) as Array<
  keyof typeof ReportReasonType
>;

interface ReportCasesFilterProps {
  search: ReportCasesSearchParams;
}

export const ReportCasesFilter = ({ search }: ReportCasesFilterProps) => {
  const { t } = useTranslation(["moderation"]);

  const {
    onReasonToggle,
    onSubjectTypeToggle,
    onStatusChange,
    onStartDateChange,
    onEndBeforeChange,
    onClearFilters,
  } = useReportCasesFilter();

  const statusOptions = [
    { label: t("moderation:filters.status.options.all"), value: "all" },
    { label: t("moderation:filters.status.options.open"), value: "open" },
    {
      label: t("moderation:filters.status.options.resolved"),
      value: "resolved",
    },
    {
      label: t("moderation:filters.status.options.rejected"),
      value: "rejected",
    },
  ];

  return (
    <BaseWrapperFilter>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h1 className={styles.subHeader}>
            {t("moderation:filters.status.title")}
          </h1>
          <SelectFilter
            label={t("moderation:filters.status.label")}
            options={statusOptions}
            value={search.Status ?? "all"}
            onChange={(val) => onStatusChange(val === "all" ? undefined : val)}
            hideLabel
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.block}>
          <h1 className={styles.subHeader}>
            {t("moderation:filters.dateRange.title")}
          </h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.block}>
          <h1 className={styles.subHeader}>
            {t("moderation:filters.reportReason.title")}
          </h1>
          <ShowMoreItemsButton
            items={reportReasonItems.map((type) => (
              <Tab
                key={type}
                name={t(`moderation:report.reasons.${type}`, {
                  defaultValue: type,
                })}
                className={styles.filterTab}
                isSelected={search.Reasons?.includes(type) ?? false}
                selectedClassName={styles.filterTabActive}
                onClick={() => onReasonToggle(type)}
              />
            ))}
            classNameButton={styles.showMoreButton}
            buttonPosition="below"
            classNameItems={styles.itemsFilter}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.block}>
          <h1 className={styles.subHeader}>
            {t("moderation:filters.subjectType.title")}
          </h1>
          <ShowMoreItemsButton
            items={subjectTypeItems.map((type) => (
              <Tab
                key={type}
                name={t(`moderation:report.subjects.${type}`, {
                  defaultValue: type,
                })}
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
              {t("moderation:filters.actions.clear")}
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </div>
    </BaseWrapperFilter>
  );
};
