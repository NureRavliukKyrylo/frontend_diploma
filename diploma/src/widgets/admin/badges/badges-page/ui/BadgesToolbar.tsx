import { TierColors, type BadgeSortingParams, type Tier } from "@entities/badge";
import { SortDropDown } from "@shared/ui/drop-down";
import { Search } from "lucide-react";
import type {
  BadgeArchiveFilterValue,
  BadgeAutoAwardFilterValue,
  BadgeScopeFilterValue,
} from "../model/useAdminBadgesPage";
import {
  badgeScopeOptions,
  badgeSortOptions,
  badgeTierOptions,
} from "../../lib/badgeAdminOptions";
import { useTranslation } from "react-i18next";

interface BadgesToolbarProps {
  styles: Record<string, string>;
  searchInput: string;
  selectedRanks: Tier[];
  archiveFilterValue: BadgeArchiveFilterValue;
  scopeFilterValue: BadgeScopeFilterValue;
  autoAwardFilterValue: BadgeAutoAwardFilterValue;
  sortValue?: BadgeSortingParams;
  onSearchInputChange: (value: string) => void;
  onToggleRank: (rank: Tier) => void;
  onArchiveFilterChange: (value: BadgeArchiveFilterValue) => void;
  onScopeFilterChange: (value: BadgeScopeFilterValue) => void;
  onAutoAwardFilterChange: (value: BadgeAutoAwardFilterValue) => void;
  onSortChange: (value: BadgeSortingParams) => void;
}

const archiveOptions: Array<{
  value: BadgeArchiveFilterValue;
  labelKey: string;
}> = [
  { value: "active", labelKey: "badges.filters.active" },
  { value: "archived", labelKey: "badges.filters.archived" },
];

const autoAwardOptions: Array<{
  value: BadgeAutoAwardFilterValue;
  labelKey: string;
}> = [
  { value: "all", labelKey: "badges.filters.anyAward" },
  { value: "auto", labelKey: "badges.filters.autoOnly" },
  { value: "manual", labelKey: "badges.filters.manualOnly" },
];

export const BadgesToolbar = ({
  styles,
  searchInput,
  selectedRanks,
  archiveFilterValue,
  scopeFilterValue,
  autoAwardFilterValue,
  sortValue,
  onSearchInputChange,
  onToggleRank,
  onArchiveFilterChange,
  onScopeFilterChange,
  onAutoAwardFilterChange,
  onSortChange,
}: BadgesToolbarProps) => {
  const { t } = useTranslation("admin");
  const scopeOptions = [
    { value: "all" as const, label: t("badges.filters.allScopes") },
    ...badgeScopeOptions
      .filter((option) => option.value !== "platform")
      .map((option) => ({
        value: option.value,
        label: t(option.labelKey),
      })),
  ];
  const sortOptions = badgeSortOptions.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBox}>
        <Search size={19} aria-hidden="true" />
        <input
          value={searchInput}
          onChange={(event) => onSearchInputChange(event.target.value)}
          placeholder={t("badges.search")}
        />
      </div>

      <div className={styles.rankFilters} aria-label={t("badges.filters.rank")}>
        {badgeTierOptions.map((rank) => {
          const isActive = selectedRanks.includes(rank);

          return (
            <button
              key={rank}
              type="button"
              className={`${styles.rankChip} ${isActive ? styles.rankChipActive : ""}`}
              style={{
                borderColor: TierColors[rank],
                background: isActive ? TierColors[rank] : undefined,
                color: isActive ? "#ffffff" : TierColors[rank],
              }}
              onClick={() => onToggleRank(rank)}
            >
              {rank}
            </button>
          );
        })}
      </div>

      <div className={styles.chipGroup}>
        {archiveOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${styles.filterChip} ${
              archiveFilterValue === option.value ? styles.filterChipActive : ""
            }`}
            onClick={() => onArchiveFilterChange(option.value)}
          >
            {t(option.labelKey)}
          </button>
        ))}
      </div>

      <div className={styles.dropdownShell}>
        <SortDropDown
          selectedLabelOnly
          options={scopeOptions}
          value={scopeFilterValue}
          onSelect={onScopeFilterChange}
        />
      </div>

      <div className={styles.dropdownShell}>
        <SortDropDown
          selectedLabelOnly
          options={autoAwardOptions.map((option) => ({
            value: option.value,
            label: t(option.labelKey),
          }))}
          value={autoAwardFilterValue}
          onSelect={onAutoAwardFilterChange}
        />
      </div>

      <div className={styles.dropdownShell}>
        <SortDropDown
          selectedLabelOnly
          options={sortOptions}
          value={sortValue ?? 0}
          onSelect={onSortChange}
        />
      </div>
    </div>
  );
};
