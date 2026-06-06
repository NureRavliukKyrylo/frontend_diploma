import { motion } from "framer-motion";
import { DateRangeFilter, SelectFilter } from "@shared/ui/filters";
import { BaseButtonWrapper } from "@shared/ui/buttons";

import type { TransactionsSearchParams } from "@entities/offer";
import styles from "./TransactionsFilter.module.scss";
import { useTransactionsFilter } from "./model/useTransactionsFilter";
import { BaseWrapperFilter } from "../base-wrapper/BaseWrapperFilter";
import {
  TRANSACTION_SOURCE_TYPE_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "./config/transactionFilterMaps";

interface TransactionsFilterProps {
  search: TransactionsSearchParams;
}

export const TransactionsFilter = ({ search }: TransactionsFilterProps) => {
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
          <h1 className={styles.subHeaderFilter}>Date range</h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndDateChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.typeFilter}>
          <h1 className={styles.subHeaderFilter}>Transaction type</h1>
          <SelectFilter
            label="Type"
            options={TRANSACTION_TYPE_OPTIONS}
            value={search.Type ?? "all"}
            onChange={onTypeChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.sourceTypeFilter}>
          <h1 className={styles.subHeaderFilter}>Source type</h1>
          <SelectFilter
            label="Source"
            options={TRANSACTION_SOURCE_TYPE_OPTIONS}
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
              Clear Filters
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </div>
    </BaseWrapperFilter>
  );
};
