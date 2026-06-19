import { useCallback, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { withDebounce } from "@shared/libs/hocs";
import { DatePickerInput } from "@shared/ui/inputs";
import { useAutocompleteSuggestions } from "@shared/libs/map";
import type { LocationSuggestion } from "@shared/config/types";
import { categoryQuery } from "@entities/category";
import type { ProjectSearchParams } from "@entities/project";
import { OrganizationProjectCategoryFilterSection } from "./filters/CategoryFilterSection";
import { OrganizationProjectDeadlineFilterSection } from "./filters/DeadlineFilterSection";
import { OrganizationProjectFiltersFooter } from "./filters/Footer";
import { OrganizationProjectLocationFilterSection } from "./filters/LocationFilterSection";
import { OrganizationProjectMoreOptionsFilterSection } from "./filters/MoreOptionsFilterSection";
import { OrganizationProjectRatingFilterSection } from "./filters/RatingFilterSection";
import styles from "../../shared/filters/Filters.module.scss";

interface ProjectFiltersProps {
  search: ProjectSearchParams;
  onChange: (patch: Partial<ProjectSearchParams>) => void;
  onReset: () => void;
}

export const ProjectFilters = ({
  search,
  onChange,
  onReset,
}: ProjectFiltersProps) => {
  const DebouncedDatePicker = useMemo(
    () => withDebounce(DatePickerInput, 300),
    [],
  );
  const [displayRating, setDisplayRating] = useState(search.Rating ?? 0);
  const [inputValue, setInputValue] = useState(search.Location ?? "");
  const [query, setQuery] = useState("");
  const [radiusInput, setRadiusInput] = useState(String(search.RadiusKm ?? 10));

  const {
    data: categories = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));

  const { suggestions, reset, error } = useAutocompleteSuggestions(query);
  const isLocationOpen = suggestions.length > 0 || !!error;
  const selectedCategoryIds = search.CategoryIds ?? [];

  useEffect(() => {
    setDisplayRating(search.Rating ?? 0);
  }, [search.Rating]);

  useEffect(() => {
    setInputValue(search.Location ?? "");
  }, [search.Location]);

  useEffect(() => {
    setRadiusInput(String(search.RadiusKm ?? 10));
  }, [search.RadiusKm]);

  const toggleCategory = useCallback(
    (categoryId: string) => {
      const next = selectedCategoryIds.includes(categoryId)
        ? selectedCategoryIds.filter((id) => id !== categoryId)
        : [...selectedCategoryIds, categoryId];

      onChange({
        CategoryIds: next.length > 0 ? next : undefined,
        Page: 1,
      });
    },
    [onChange, selectedCategoryIds],
  );

  const handleSelectLocation = useCallback(
    ({ displayName, lat, lng }: LocationSuggestion) => {
      setInputValue(displayName);
      setQuery("");
      reset();
      onChange({
        Lat: lat,
        Lng: lng,
        Location: displayName,
        RadiusKm: search.RadiusKm ?? 10,
        Page: 1,
      });
    },
    [onChange, reset, search.RadiusKm],
  );

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setQuery(value);

    if (!value) {
      onChange({
        Lat: undefined,
        Lng: undefined,
        Location: undefined,
        RadiusKm: undefined,
        Page: 1,
      });
    }
  };

  const handleRadiusInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    if (Number(rawValue) > 100) {
      return;
    }

    setRadiusInput(rawValue);
  };

  const handleRadiusBlur = () => {
    const clamped = Math.max(10, Number(radiusInput));
    setRadiusInput(String(clamped));
    onChange({ RadiusKm: clamped, Page: 1 });
  };

  return (
    <>
      <div className={styles.scrollableProjectsFilters}>
        <OrganizationProjectDeadlineFilterSection
          search={search}
          onChange={onChange}
          DateInput={DebouncedDatePicker}
        />

        <div className={styles.dividerFilterBlock} />

        <OrganizationProjectRatingFilterSection
          search={search}
          displayRating={displayRating}
          setDisplayRating={setDisplayRating}
          onChange={onChange}
        />

        <div className={styles.dividerFilterBlock} />

        <OrganizationProjectCategoryFilterSection
          categories={categories}
          selectedCategoryIds={selectedCategoryIds}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onToggleCategory={toggleCategory}
          onFetchNextPage={() => fetchNextPage()}
        />

        <div className={styles.dividerFilterBlock} />

        <OrganizationProjectLocationFilterSection
          search={search}
          inputValue={inputValue}
          radiusInput={radiusInput}
          suggestions={suggestions}
          error={error}
          isLocationOpen={isLocationOpen}
          onLocationChange={handleLocationChange}
          onRadiusInputChange={handleRadiusInputChange}
          onRadiusBlur={handleRadiusBlur}
          onSelectLocation={handleSelectLocation}
        />

        <div className={styles.dividerFilterBlock} />

        <OrganizationProjectMoreOptionsFilterSection
          search={search}
          onChange={onChange}
        />
      </div>

      <div className={styles.dividerFilterBlock} />

      <OrganizationProjectFiltersFooter onReset={onReset} />
    </>
  );
};
