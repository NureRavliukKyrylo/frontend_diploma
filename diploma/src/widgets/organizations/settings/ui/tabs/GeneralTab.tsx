import { useState, type ChangeEvent } from "react";
import type {
  OrganizationSettingsChangeHandler,
  OrganizationSettingsErrors,
  OrganizationSettingsValues,
} from "@features/organization/settings-form";
import type { Organization } from "@entities/organization";
import type { Coordinates } from "@shared/config/types";
import { useAutocompleteSuggestions } from "@shared/libs/map";
import { BasicInfoSection } from "./general-tab/BasicInfoSection";
import { LocationMapModal } from "./general-tab/LocationMapModal";
import { LocationSection } from "./general-tab/LocationSection";
import { LogoSection } from "./general-tab/LogoSection";
import styles from "./GeneralTab.module.scss";

interface GeneralTabProps {
  organizationId: string;
  organization: Organization;
  values: OrganizationSettingsValues;
  errors: OrganizationSettingsErrors;
  logoUrl?: string | null;
  initials: string;
  isLogoUploading: boolean;
  isLogoRemoving: boolean;
  onChange: OrganizationSettingsChangeHandler;
  onLocationTextChange: (value: string) => void;
  onLocationChange: (coordinates: Coordinates, label?: string) => void;
  onLogoSelect: (file: File | null) => void;
  onLogoRemove: () => void;
}

export const GeneralTab = ({
  organization,
  values,
  errors,
  logoUrl,
  initials,
  isLogoUploading,
  isLogoRemoving,
  onChange,
  onLocationTextChange,
  onLocationChange,
  onLogoSelect,
  onLogoRemove,
}: GeneralTabProps) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const descriptionLength = values.description.length;
  const { suggestions, error: locationError, reset } =
    useAutocompleteSuggestions(locationQuery);
  const isLocationDropdownOpen =
    Boolean(locationQuery.trim()) &&
    (suggestions.length > 0 || Boolean(locationError));

  const handleLocationInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const nextValue = event.target.value;
    setLocationQuery(nextValue);
    onLocationTextChange(nextValue);
  };

  const handleLocationSuggestionSelect = (suggestion: {
    displayName: string;
    lat: number;
    lng: number;
  }) => {
    setLocationQuery("");
    reset();
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
      <LogoSection
        organizationName={organization.name}
        logoUrl={logoUrl}
        initials={initials}
        isLogoUploading={isLogoUploading}
        isLogoRemoving={isLogoRemoving}
        onLogoSelect={onLogoSelect}
        onLogoRemove={onLogoRemove}
      />

      <BasicInfoSection
        values={values}
        errors={errors}
        descriptionLength={descriptionLength}
        onChange={onChange}
      />

      <LocationSection
        values={values}
        suggestions={suggestions}
        locationError={locationError}
        isLocationDropdownOpen={isLocationDropdownOpen}
        onLocationInputChange={handleLocationInputChange}
        onLocationSuggestionSelect={handleLocationSuggestionSelect}
        onMapOpen={() => setIsMapOpen(true)}
      />

      <LocationMapModal
        isOpen={isMapOpen}
        coordinates={values.location}
        onClose={() => setIsMapOpen(false)}
        onLocationChange={onLocationChange}
      />
    </div>
  );
};
