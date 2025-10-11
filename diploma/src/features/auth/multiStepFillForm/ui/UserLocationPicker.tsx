import styles from "./UserLocationPicker.module.scss";
import { MapLocationPicker } from "../../../../shared/components";
import {
  NextStepperButton,
  PreviousStepperButton,
  SkipStepperButton,
} from "../../../../shared/buttons/auth";
import { useLocationForm } from "../model/useLocationForm";

export const UserLocationPicker = () => {
  const { formik, handleLocationChange } = useLocationForm();

  return (
    <form onSubmit={formik.handleSubmit} className={styles.locationWrapper}>
      <div
        className={`${styles.mapLocationWrapper} ${
          formik.touched.coordinates && formik.errors.coordinates
            ? styles.errorBorder
            : ""
        }`}
      >
        <MapLocationPicker
          coordinates={formik.values.coordinates}
          defaultCoordinates={formik.values.coordinates}
          onLocationChange={handleLocationChange}
          popUpText="Your Location"
        />
      </div>

      {formik.touched.coordinates && formik.errors.coordinates && (
        <div className={styles.errorLocation}>{formik.errors.coordinates}</div>
      )}

      <div className={styles.buttonsFillForm}>
        <PreviousStepperButton />
        <div className={styles.interactStepperButtons}>
          <SkipStepperButton />
          <NextStepperButton />
        </div>
      </div>
    </form>
  );
};
