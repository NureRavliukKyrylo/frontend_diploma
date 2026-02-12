import { useEffect } from "react";
import { useFormik } from "formik";
import { useAuthStore } from "@entities/user";
import type { Coordinates } from "@entities/user";
import { locationSchema } from "../libs/locationSchema";

export const useLocationForm = () => {
  const setCoordinates = useAuthStore((state) => state.setCoordinates);
  const nextStep = useAuthStore((state) => state.nextStep);
  const storeCoordinates = useAuthStore((state) => state.profile?.coordinates);

  const formik = useFormik({
    initialValues: {
      coordinates: storeCoordinates || null,
    },
    validationSchema: locationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: (values) => {
      setCoordinates(values.coordinates);
      nextStep();
    },
  });

  useEffect(() => {
    if (
      !formik.values.coordinates?.latitude ||
      !formik.values.coordinates?.longitude
    ) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords: Coordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            formik.setFieldValue("coordinates", coords);
          },
          () => {
            console.log("Location access denied or unavailable");
          },
        );
      }
    }
  }, []);

  const handleLocationChange = (coords: Coordinates) => {
    formik.setFieldValue("coordinates", coords);
  };

  return {
    formik,
    handleLocationChange,
  };
};
