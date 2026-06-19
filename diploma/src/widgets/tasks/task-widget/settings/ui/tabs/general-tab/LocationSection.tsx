import { X } from "lucide-react";
import type { TaskSettingsValues } from "@features/task/edit-form";
import { MapLocationInput } from "@shared/ui/inputs";
import styles from "../../TaskEditSettings.module.scss";

interface LocationSectionProps {
  values: TaskSettingsValues;
  onMapOpen: () => void;
  onLocationClear: () => void;
}

export const LocationSection = ({
  values,
  onMapOpen,
  onLocationClear,
}: LocationSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionLabel}>Location</h2>
    <p className={styles.sectionDescription}>
      Optional. Leave this empty when the task can be done remotely.
    </p>

    <div className={styles.locationRow}>
      <div className={styles.mapLocationWrapper}>
        <MapLocationInput
          label={values.locationLabel || "Pick task location"}
          handleMapOpen={onMapOpen}
          variant="entity"
        />
      </div>
      {values.location ? (
        <button
          type="button"
          className={styles.clearLocationButton}
          onClick={onLocationClear}
        >
          <X size={16} />
          Clear
        </button>
      ) : null}
    </div>
  </section>
);
