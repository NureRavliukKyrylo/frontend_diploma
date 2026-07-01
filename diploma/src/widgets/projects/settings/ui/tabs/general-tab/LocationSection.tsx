import { AnimatePresence, motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { Map } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ProjectSettingsErrors } from "@features/project";
import styles from "../GeneralTab.module.scss";

interface LocationSuggestion {
  displayName: string;
  lat: number;
  lng: number;
}

interface LocationSectionProps {
  locationQuery: string;
  errors: ProjectSettingsErrors;
  suggestions: LocationSuggestion[];
  error?: string | null;
  dropdownOpen: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMapOpen: () => void;
  onSuggestionSelect: (suggestion: LocationSuggestion) => void;
}

export const LocationSection = ({
  locationQuery,
  errors,
  suggestions,
  error,
  dropdownOpen,
  onInputChange,
  onMapOpen,
  onSuggestionSelect,
}: LocationSectionProps) => {
  const { t } = useTranslation("project");

  return (
    <section className={styles.section}>
    <h2 className={styles.sectionLabel}>{t("settings.general.location")}</h2>
    <p className={styles.sectionDescription}>
      {t("settings.general.locationText")}
    </p>

    <div className={styles.locationField}>
      <span className={styles.fieldLabel}>
        {t("settings.general.projectLocation")}
      </span>
      <div className={styles.locationSearchWrapper}>
        <input
          value={locationQuery}
          placeholder={t("settings.general.locationPlaceholder")}
          aria-invalid={Boolean(errors.location)}
          onChange={onInputChange}
        />
        <button
          type="button"
          className={styles.mapPickerButton}
          aria-label={t("settings.general.locationAria")}
          onClick={onMapOpen}
        >
          <Map size={22} />
        </button>

        <AnimatePresence>
          {dropdownOpen ? (
            <motion.ul
              className={styles.locationDropdown}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {error ? (
                <li className={styles.locationDropdownInfo}>{error}</li>
              ) : (
                suggestions.map((suggestion) => (
                  <li
                    key={`${suggestion.displayName}-${suggestion.lat}-${suggestion.lng}`}
                    onClick={() => onSuggestionSelect(suggestion)}
                  >
                    {suggestion.displayName}
                  </li>
                ))
              )}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
      {errors.location ? (
        <small className={styles.fieldError}>{errors.location}</small>
      ) : null}
    </div>
    </section>
  );
};
