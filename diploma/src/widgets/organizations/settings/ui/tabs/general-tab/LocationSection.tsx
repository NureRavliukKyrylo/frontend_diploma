import { AnimatePresence, motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { Map } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrganizationSettingsValues } from "@features/organization/settings-form";
import styles from "../GeneralTab.module.scss";

interface LocationSuggestion {
  displayName: string;
  lat: number;
  lng: number;
}

interface LocationSectionProps {
  values: OrganizationSettingsValues;
  suggestions: LocationSuggestion[];
  locationError?: string | null;
  isLocationDropdownOpen: boolean;
  onLocationInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLocationSuggestionSelect: (suggestion: LocationSuggestion) => void;
  onMapOpen: () => void;
}

export const LocationSection = ({
  values,
  suggestions,
  locationError,
  isLocationDropdownOpen,
  onLocationInputChange,
  onLocationSuggestionSelect,
  onMapOpen,
}: LocationSectionProps) => {
  const { t } = useTranslation("organizations");

  return (
    <section className={styles.section}>
    <h2 className={styles.sectionLabel}>{t("settings.general.location")}</h2>
    <p className={styles.sectionDescription}>
      {t("settings.general.locationText")}
    </p>

    <div className={styles.locationField}>
      <span className={styles.fieldLabel}>
        {t("settings.general.cityRegion")}
      </span>
      <div className={styles.locationSearchWrapper}>
        <input
          value={values.locationLabel}
          placeholder={t("settings.general.locationPlaceholder")}
          onChange={onLocationInputChange}
        />
        <button
          type="button"
          className={styles.mapPickerButton}
          onClick={onMapOpen}
          aria-label={t("settings.general.mapAria")}
        >
          <Map size={22} strokeWidth={2.2} />
        </button>

        <AnimatePresence>
          {isLocationDropdownOpen ? (
            <motion.ul
              className={styles.locationDropdown}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {locationError ? (
                <li className={styles.locationDropdownInfo}>{locationError}</li>
              ) : (
                suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion.displayName}-${index}`}
                    onClick={() => onLocationSuggestionSelect(suggestion)}
                  >
                    {suggestion.displayName}
                  </li>
                ))
              )}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
    </section>
  );
};
