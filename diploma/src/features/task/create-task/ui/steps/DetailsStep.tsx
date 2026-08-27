import { useState } from "react";
import { reverseGeocode } from "@shared/libs/map";
import type {
  CreateTaskFormErrors,
  CreateTaskFormState,
} from "../../model/useCreateTaskForm";
import type { CreateTaskLocation } from "../../api/createTaskApi";
import { TaskEffortBlock } from "./details-step/TaskEffortBlock";
import { TaskLocationBlock } from "./details-step/TaskLocationBlock";
import { TaskLocationMapModal } from "./details-step/TaskLocationMapModal";
import { TaskTimelineBlock } from "./details-step/TaskTimelineBlock";
import { safelyParseDateTime } from "./details-step/dateTimePicker";
import styles from "../CreateTaskDrawer.module.scss";

interface DetailsStepProps {
  values: Pick<
    CreateTaskFormState,
    "location" | "startAt" | "endAt" | "estimatedMinutes" | "points"
  >;
  errors: CreateTaskFormErrors;
  onLocationChange: (location: CreateTaskLocation | null) => void;
  onChange: (
    field: "startAt" | "endAt" | "estimatedMinutes" | "points",
    value: string | number | null,
  ) => void;
}

export const DetailsStep = ({
  values,
  errors,
  onLocationChange,
  onChange,
}: DetailsStepProps) => {
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
      <div className={styles.card}>
        <div className={styles.cardDeco} />
        <TaskLocationBlock
          location={values.location}
          onMapOpen={() => setIsMapOpen(true)}
        />
        <TaskTimelineBlock
          values={values}
          errors={errors}
          minimumEndDate={minimumEndDate}
          onChange={onChange}
        />
        <TaskEffortBlock values={values} onChange={onChange} />
      </div>

      <TaskLocationMapModal
        isOpen={isMapOpen}
        coordinates={values.location}
        onClose={() => setIsMapOpen(false)}
        onLocationChange={handleMapLocationChange}
      />
    </div>
  );
};
