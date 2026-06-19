import { useEffect, useState, type ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryQuery } from "@entities/category";
import {
  type ProjectSettingsErrors,
  type ProjectSettingsValues,
} from "@features/project";
import type { Coordinates } from "@shared/config/types";
import { useAutocompleteSuggestions } from "@shared/libs/map";
import { BasicInfoSection } from "./general-tab/BasicInfoSection";
import { CategoriesSection } from "./general-tab/CategoriesSection";
import { LocationMapModal } from "./general-tab/LocationMapModal";
import { LocationSection } from "./general-tab/LocationSection";
import { TimelineSection } from "./general-tab/TimelineSection";
import { safelyParseDate } from "./general-tab/datePicker";
import styles from "./GeneralTab.module.scss";

interface GeneralTabProps {
  values: ProjectSettingsValues;
  errors: ProjectSettingsErrors;
  onChange: <Field extends keyof ProjectSettingsValues>(
    field: Field,
    value: ProjectSettingsValues[Field],
  ) => void;
  onDateChange: (field: "startAt" | "endAt", value: string | null) => void;
  onCategoryToggle: (categoryId: string) => void;
  onLocationTextChange: (value: string) => void;
  onLocationChange: (coordinates: Coordinates, label?: string) => void;
}

export const GeneralTab = ({
  values,
  errors,
  onChange,
  onDateChange,
  onCategoryToggle,
  onLocationTextChange,
  onLocationChange,
}: GeneralTabProps) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState(values.locationLabel);
  const { data: categoriesResponse, isLoading: categoriesLoading } = useQuery(
    categoryQuery.list({ Page: 1, PageSize: 100 }),
  );
  const { suggestions, error, reset } =
    useAutocompleteSuggestions(locationQuery);
  const dropdownOpen =
    Boolean(locationQuery.trim()) &&
    locationQuery !== values.locationLabel &&
    (suggestions.length > 0 || Boolean(error));
  const minimumEndDate = safelyParseDate(values.startAt);
  const categories = categoriesResponse?.data ?? [];

  useEffect(() => {
    setLocationQuery(values.locationLabel);
  }, [values.locationLabel]);

  const handleLocationInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocationQuery(event.target.value);
    onLocationTextChange(event.target.value);
  };

  const handleLocationSuggestionSelect = (suggestion: {
    displayName: string;
    lat: number;
    lng: number;
  }) => {
    reset();
    setLocationQuery(suggestion.displayName);
    onLocationChange(
      {
        latitude: suggestion.lat,
        longitude: suggestion.lng,
      },
      suggestion.displayName,
    );
  };

  return (
    <div className={styles.sectionsContainer}>
      <BasicInfoSection values={values} errors={errors} onChange={onChange} />
      <TimelineSection
        values={values}
        errors={errors}
        minimumEndDate={minimumEndDate}
        onDateChange={onDateChange}
      />
      <CategoriesSection
        categories={categories}
        selectedIds={values.categoryIds}
        isLoading={categoriesLoading}
        onCategoryToggle={onCategoryToggle}
      />
      <LocationSection
        locationQuery={locationQuery}
        errors={errors}
        suggestions={suggestions}
        error={error}
        dropdownOpen={dropdownOpen}
        onInputChange={handleLocationInputChange}
        onMapOpen={() => setIsMapOpen(true)}
        onSuggestionSelect={handleLocationSuggestionSelect}
      />
      <LocationMapModal
        isOpen={isMapOpen}
        coordinates={values.location}
        onClose={() => setIsMapOpen(false)}
        onLocationChange={(coordinates) => onLocationChange(coordinates)}
      />
    </div>
  );
};
