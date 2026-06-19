import { MapLocationInput } from "@shared/ui/inputs";
import type { CreateTaskLocation } from "../../../api/createTaskApi";
import styles from "../../CreateTaskDrawer.module.scss";

interface TaskLocationBlockProps {
  location: CreateTaskLocation | null;
  onMapOpen: () => void;
}

export const TaskLocationBlock = ({
  location,
  onMapOpen,
}: TaskLocationBlockProps) => (
  <section className={styles.fieldBlock}>
    <h2 className={styles.fieldLabel}>Location</h2>
    <p className={styles.fieldHint}>Choose where this task should happen.</p>
    <div className={styles.mapLocationWrapper}>
      <MapLocationInput
        label={location?.regionLabel ?? "Pick task location"}
        handleMapOpen={onMapOpen}
        variant="entity"
      />
    </div>
  </section>
);
