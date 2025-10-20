import styles from "./styles/UserLocationPicker.module.scss";
import { MapLocationPicker } from "@shared/ui";
import { useLocationForm } from "../model/useLocationForm";

export const UserLocationPicker = () => {
  const { formik, handleLocationChange } = useLocationForm();

  return (
    <form
      id="user-location-filling-form"
      onSubmit={formik.handleSubmit}
      className={styles.locationWrapper}
    >
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
    </form>
  );
};
