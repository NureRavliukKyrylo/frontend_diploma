import styles from "./ImageForm.module.scss";
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
      <MapLocationPicker
        coordinates={formik.values.coordinates}
        defaultCoordinates={formik.values.coordinates}
        onLocationChange={handleLocationChange}
        popUpText="Your Location"
      />

      {formik.touched.coordinates && formik.errors.coordinates && (
        <div className={styles.error}>{formik.errors.coordinates}</div>
      )}

      <div className={styles.buttonsFillForm}>
        <div className={styles.interactStepperButtons}>
          <PreviousStepperButton />
          <NextStepperButton />
          <SkipStepperButton />
        </div>
      </div>
    </form>
  );
};
