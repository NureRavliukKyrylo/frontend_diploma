import styles from "./UserLocationPicker.module.scss";
import { MapLocationPicker } from "@features/map";
import { useLocationForm } from "../../location-form/model/useLocationForm";
import { UserMarker } from "@entities/user/profile";

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
          onLocationChange={handleLocationChange}
          popUpText="Your Location"
          icon={UserMarker}
        />
      </div>

      {formik.touched.coordinates && formik.errors.coordinates && (
        <div className={styles.errorLocation}>{formik.errors.coordinates}</div>
      )}
    </form>
  );
};
