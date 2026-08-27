import { useState } from "react";
import { parseDateTime } from "@internationalized/date";
import { UserMarker } from "@entities/user/profile";
import { MapLocationPicker } from "@features/map";
import { reverseGeocode } from "@shared/libs/map";
import { DatePickerInput, MapLocationInput } from "@shared/ui/inputs";
import { BaseModal } from "@shared/ui/modals";
import type { CreateEventLocation } from "../../api/createEventApi";
import type {
  CreateEventFormErrors,
  CreateEventFormState,
} from "../../model/useCreateEventForm";
import styles from "./CreateEventSteps.module.scss";

interface LocationDatesStepProps {
  values: Pick<CreateEventFormState, "location" | "startAt" | "endAt">;
  errors: CreateEventFormErrors;
  onLocationChange: (location: CreateEventLocation | null) => void;
  onFieldChange: (field: "startAt" | "endAt", value: string | null) => void;
}

const dateTimePickerClassNames = {
  base: styles.datePickerBase,
  inputWrapper: styles.datePickerInput,
  input: styles.datePickerText,
  segment: styles.datePickerSegment,
  selectorIcon: styles.datePickerIcon,
  calendar: styles.datePickerCalendar,
  popoverContent: styles.dateTimePopover,
};

const safelyParseDateTime = (value: string | null) => {
  if (!value) return undefined;

  try {
    return parseDateTime(value);
  } catch {
    return undefined;
  }
};

export const LocationDatesStep = ({
  values,
  errors,
  onLocationChange,
  onFieldChange,
}: LocationDatesStepProps) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const minimumEndDate = safelyParseDateTime(values.startAt);

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

    onLocationChange({ ...coordinates, regionLabel });
  };

  return (
    <div className={styles.stepContent}>
      <div className={styles.formCard}>
        <span className={styles.cardDeco} />
        <section className={styles.fieldBlock}>
          <h2 className={styles.blockLabel}>Location</h2>
          <p className={styles.blockHint}>Where will this event take place?</p>
          <div className={styles.mapLocationWrapper}>
            <MapLocationInput
              label={values.location?.regionLabel ?? "Pick event location"}
              handleMapOpen={() => setIsMapOpen(true)}
              variant="entity"
            />
          </div>
          {errors.location ? (
            <span className={styles.formError}>{errors.location}</span>
          ) : null}
        </section>

        <section className={styles.fieldBlock}>
          <h2 className={styles.blockLabel}>Date &amp; time</h2>
          <p className={styles.blockHint}>Events can be up to 7 days long.</p>

          <div className={styles.dateRow}>
            <div className={styles.dateField}>
              <span className={styles.fieldName}>Start</span>
              <DatePickerInput
                aria-label="Event start date and time"
                value={values.startAt}
                granularity="minute"
                hourCycle={24}
                classNames={dateTimePickerClassNames}
                isInvalid={Boolean(errors.startAt)}
                onChange={(value) => onFieldChange("startAt", value ?? null)}
              />
              {errors.startAt ? (
                <span className={styles.formError}>{errors.startAt}</span>
              ) : null}
            </div>

            <div className={styles.dateField}>
              <span className={styles.fieldName}>End</span>
              <DatePickerInput
                aria-label="Event end date and time"
                value={values.endAt}
                minValue={minimumEndDate}
                granularity="minute"
                hourCycle={24}
                classNames={dateTimePickerClassNames}
                isInvalid={Boolean(errors.endAt)}
                onChange={(value) => onFieldChange("endAt", value ?? null)}
              />
              {errors.endAt ? (
                <span className={styles.formError}>{errors.endAt}</span>
              ) : null}
            </div>
          </div>

          <p className={styles.datetimeHint}>
            End time must be after start. Maximum duration is 7 days.
          </p>
        </section>
      </div>

      <BaseModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        maxWidth="920px"
        showClosed
        animation="right"
      >
        <div className={styles.mapModal}>
          <MapLocationPicker
            coordinates={values.location}
            onLocationChange={handleMapLocationChange}
            icon={UserMarker}
            popupClassName={styles.mapPopup}
            popupContent={
              <p className={styles.mapPopupContent}>Event location</p>
            }
          />
        </div>
      </BaseModal>
    </div>
  );
};
