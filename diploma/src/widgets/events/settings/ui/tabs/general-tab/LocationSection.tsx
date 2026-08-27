import { useEffect, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Map as MapIcon } from "lucide-react";
import { UserMarker } from "@entities/user/profile";
import {
  type EventSettingsErrors,
  type EventSettingsLockState,
  type EventSettingsValues,
} from "@features/event";
import { MapLocationPicker } from "@features/map";
import type { Coordinates } from "@shared/config/types";
import { useAutocompleteSuggestions } from "@shared/libs/map";
import { BaseModal } from "@shared/ui/modals";
import { useTranslation } from "react-i18next";
import sectionStyles from "./GeneralTabShared.module.scss";
import styles from "./LocationSection.module.scss";

interface LocationSectionProps {
  values: EventSettingsValues;
  errors: EventSettingsErrors;
  lockState: EventSettingsLockState;
  onLocationTextChange: (value: string) => void;
  onLocationChange: (coordinates: Coordinates, label?: string) => void;
}

export const LocationSection = ({
  values,
  errors,
  lockState,
  onLocationTextChange,
  onLocationChange,
}: LocationSectionProps) => {
  const { t } = useTranslation("event");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState(values.locationLabel);
  const { suggestions, error, reset } =
    useAutocompleteSuggestions(locationQuery);
  const dropdownOpen =
    !lockState.scheduleAndLocationLocked &&
    Boolean(locationQuery.trim()) &&
    locationQuery !== values.locationLabel &&
    (suggestions.length > 0 || Boolean(error));

  useEffect(() => {
    setLocationQuery(values.locationLabel);
  }, [values.locationLabel]);

  const handleLocationInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (lockState.scheduleAndLocationLocked) return;

    setLocationQuery(event.target.value);
    onLocationTextChange(event.target.value);
  };

  return (
    <section className={sectionStyles.section}>
      <h2 className={sectionStyles.sectionLabel}>
        {t("settings.general.location")}
      </h2>
      <p className={sectionStyles.sectionDescription}>
        {t("settings.general.locationText")}
      </p>

      <div
        className={`${styles.locationField} ${
          lockState.scheduleAndLocationLocked ? sectionStyles.disabledBlock : ""
        }`}
      >
        <span className={sectionStyles.fieldLabel}>
          {t("settings.general.eventLocation")}
        </span>
        <div className={styles.locationSearchWrapper}>
          <input
            value={locationQuery}
            placeholder={t("settings.general.locationPlaceholder")}
            aria-invalid={Boolean(errors.location)}
            disabled={lockState.scheduleAndLocationLocked}
            onChange={handleLocationInputChange}
          />
          <button
            type="button"
            className={styles.mapPickerButton}
            aria-label={t("settings.general.locationAria")}
            disabled={lockState.scheduleAndLocationLocked}
            onClick={() => setIsMapOpen(true)}
          >
            <MapIcon size={22} />
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
                      onClick={() => {
                        reset();
                        setLocationQuery(suggestion.displayName);
                        onLocationChange(
                          {
                            latitude: suggestion.lat,
                            longitude: suggestion.lng,
                          },
                          suggestion.displayName,
                        );
                      }}
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

      <BaseModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        maxWidth="920px"
        className={styles.locationMapModalShell}
        showClosed={false}
        animation="right"
      >
        <div className={styles.locationMapModal}>
          <MapLocationPicker
            coordinates={values.location}
            onLocationChange={(coordinates) => onLocationChange(coordinates)}
            icon={UserMarker}
            popupClassName={styles.mapPopup}
            popupContent={
              <p className={styles.mapPopupContent}>
                <CalendarDays size={16} />
                {t("settings.general.eventLocation")}
              </p>
            }
          />
        </div>
      </BaseModal>
    </section>
  );
};
