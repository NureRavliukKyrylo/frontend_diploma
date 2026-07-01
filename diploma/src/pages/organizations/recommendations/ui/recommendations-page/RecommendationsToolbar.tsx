import { useTranslation } from "react-i18next";
import type { SortOption } from "@shared/config/types";
import { SortDropDown } from "@shared/ui/drop-down/sorting/SortDropDown";
import { SearchBar } from "@shared/ui/inputs/search-bar/SearchBar";
import type { RecommendationFilter, RecommendationSort } from "../../model/types";
import styles from "./RecommendationsToolbar.module.scss";

const filters: Array<{ labelKey: string; value: RecommendationFilter }> = [
  { labelKey: "recommendations.toolbar.all", value: "all" },
  { labelKey: "recommendations.toolbar.boosted", value: "boosted" },
  { labelKey: "recommendations.toolbar.nearby", value: "nearby" },
];

interface RecommendationsToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filter: RecommendationFilter;
  onFilterChange: (value: RecommendationFilter) => void;
  sort: RecommendationSort;
  onSortChange: (value: RecommendationSort) => void;
}

export const RecommendationsToolbar = ({
  searchValue,
  onSearchChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
}: RecommendationsToolbarProps) => {
  const { t } = useTranslation("organizations");
  const sortOptions: SortOption<RecommendationSort>[] = [
    { label: t("recommendations.toolbar.bestMatch"), value: "score" },
  ];

  return (
    <div className={styles.toolbar}>
    <div className={styles.search}>
      <SearchBar value={searchValue} onChange={onSearchChange} />
    </div>

    <div className={styles.filters}>
      {filters.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`${styles.filterChip} ${
            filter === item.value ? styles.filterChipActive : ""
          }`}
          onClick={() => onFilterChange(item.value)}
        >
          {t(item.labelKey)}
        </button>
      ))}
    </div>

    <div className={styles.sort}>
      <SortDropDown
        options={sortOptions}
        value={sort}
        onSelect={onSortChange}
        selectedLabelOnly
      />
    </div>
    </div>
  );
};
