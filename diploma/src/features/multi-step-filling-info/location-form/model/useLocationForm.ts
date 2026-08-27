import { useFormik } from "formik";
import { useAuthStore } from "@entities/user";
import { getLocationSchema } from "../libs/locationSchema";
import type { Coordinates } from "@shared/config/types";
import { useTranslation } from "react-i18next";

export const useLocationForm = () => {
  const setCoordinates = useAuthStore((state) => state.setCoordinates);
  const nextStep = useAuthStore((state) => state.nextStep);
  const storeCoordinates = useAuthStore((state) => state.profile?.coordinates);
  const { t } = useTranslation(["common", "auth"]);
  const validationSchema = getLocationSchema(t);

  const formik = useFormik({
    initialValues: {
      coordinates: storeCoordinates || null,
    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: (values) => {
      setCoordinates(values.coordinates);
      nextStep();
    },
  });

  const handleLocationChange = (coords: Coordinates) => {
    formik.setFieldValue("coordinates", coords);
  };

  return {
    formik,
    handleLocationChange,
  };
};
