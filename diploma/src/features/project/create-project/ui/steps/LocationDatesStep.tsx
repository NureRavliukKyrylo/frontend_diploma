import { useEffect, useState, type ChangeEvent } from "react";
import { reverseGeocode, useAutocompleteSuggestions } from "@shared/libs/map";
import type { CreateProjectLocation } from "../../api/createProjectApi";
import type {
  CreateProjectFormErrors,
  CreateProjectFormState,
} from "../../model/useCreateProjectForm";
import { ProjectLocationBlock } from "./location-dates-step/ProjectLocationBlock";
import { ProjectLocationMapModal } from "./location-dates-step/ProjectLocationMapModal";
import { ProjectTimelineBlock } from "./location-dates-step/ProjectTimelineBlock";
import { safelyParseDate } from "./location-dates-step/datePicker";
import styles from "./CreateProjectSteps.module.scss";

interface LocationDatesStepProps {
  values: Pick<CreateProjectFormState, "location" | "startAt" | "endAt">;
  errors: CreateProjectFormErrors;
  onLocationChange: (location: CreateProjectLocation | null) => void;
  onDateChange: (field: "startAt" | "endAt", value: string | null) => void;
}

export const LocationDatesStep = ({
  values,
  errors,
  onLocationChange,
  onDateChange,
}: LocationDatesStepProps) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState(
    values.location?.regionLabel ?? "",
  );
  const { suggestions, error, reset } =
    useAutocompleteSuggestions(locationQuery);
  const dropdownOpen =
    Boolean(locationQuery.trim()) &&
    locationQuery !== values.location?.regionLabel &&
    (suggestions.length > 0 || Boolean(error));
  const minimumEndDate = safelyParseDate(values.startAt);

  useEffect(() => {
    if (values.location?.regionLabel) {
      setLocationQuery(values.location.regionLabel);
    }
  }, [values.location?.regionLabel]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocationQuery(event.target.value);
    onLocationChange(null);
  };

  const handleMapLocationChange = async (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    let regionLabel = "";

    try {
      regionLabel = await reverseGeocode(
        coordinates.latitude,
        coordinates.longitude,
      );
    } catch {
      regionLabel = `${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}`;
    }

    setLocationQuery(regionLabel);
    onLocationChange({ ...coordinates, regionLabel });
  };

  const handleSuggestionSelect = (suggestion: {
    displayName: string;
    lat: number;
    lng: number;
  }) => {
    reset();
    setLocationQuery(suggestion.displayName);
    onLocationChange({
      latitude: suggestion.lat,
      longitude: suggestion.lng,
      regionLabel: suggestion.displayName,
    });
  };

  return (
    <div className={styles.stepContent}>
      <div className={styles.formCard}>
        <span className={styles.cardDeco} />
        <ProjectLocationBlock
          locationQuery={locationQuery}
          errors={errors}
          suggestions={suggestions}
          error={error}
          dropdownOpen={dropdownOpen}
          onInputChange={handleInputChange}
          onMapOpen={() => setIsMapOpen(true)}
          onSuggestionSelect={handleSuggestionSelect}
        />
        <ProjectTimelineBlock
          values={values}
          minimumEndDate={minimumEndDate}
          onDateChange={onDateChange}
        />
      </div>

      <ProjectLocationMapModal
        isOpen={isMapOpen}
        coordinates={values.location}
        onClose={() => setIsMapOpen(false)}
        onLocationChange={handleMapLocationChange}
      />
    </div>
  );
};
