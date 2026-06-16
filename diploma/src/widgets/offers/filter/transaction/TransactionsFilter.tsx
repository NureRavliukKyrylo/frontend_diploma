import { motion } from "framer-motion";
import { DateRangeFilter, SelectFilter } from "@shared/ui/filters";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";

import type { TransactionsSearchParams } from "@entities/offer";
import styles from "./TransactionsFilter.module.scss";
import { useTransactionsFilter } from "./model/useTransactionsFilter";
import {
  getTransactionSourceTypeOptions,
  getTransactionTypeOptions,
} from "./config/transactionFilterMaps";
import { BaseWrapperFilter } from "@shared/ui/wrappers";

interface TransactionsFilterProps {
  search: TransactionsSearchParams;
}

export const TransactionsFilter = ({ search }: TransactionsFilterProps) => {
  const { t } = useTranslation(["timeBank", "common"]);
  const {
    onTypeChange,
    onSourceTypeChange,
    onStartDateChange,
    onEndDateChange,
    onClearFilters,
  } = useTransactionsFilter();

  return (
    <BaseWrapperFilter>
      <div className={styles.wrapper}>
        <div className={styles.dateRange}>
          <h1 className={styles.subHeaderFilter}>
            {t("transactions.filter.sections.dateRange")}
          </h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndDateChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.typeFilter}>
          <h1 className={styles.subHeaderFilter}>
            {t("transactions.filter.sections.type")}
          </h1>
          <SelectFilter
            label={t("transactions.filter.labels.type")}
            options={getTransactionTypeOptions(t)}
            value={search.Type ?? "all"}
            onChange={onTypeChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.sourceTypeFilter}>
          <h1 className={styles.subHeaderFilter}>
            {t("transactions.filter.sections.source")}
          </h1>
          <SelectFilter
            label={t("transactions.filter.labels.source")}
            options={getTransactionSourceTypeOptions(t)}
            value={search.SourceType ?? "all"}
            onChange={onSourceTypeChange}
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
              {t("transactions.filter.actions.clear")}
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </div>
    </BaseWrapperFilter>
  );
};
