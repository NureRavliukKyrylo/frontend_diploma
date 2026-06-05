import { useFormik } from "formik";
import { locationSchema } from "../libs/locationSchema";
import type { Coordinates } from "@shared/config/types";
import { useOfferFormStore, type OfferFormData } from "@entities/offer";

interface UseLocationFormProps {
  data: OfferFormData;
}

export const useLocationForm = ({ data }: UseLocationFormProps) => {
  const setData = useOfferFormStore((s) => s.setData);
  const formik = useFormik<{ location: Coordinates | null }>({
    initialValues: {
      location: data.location,
    },
    validationSchema: locationSchema,
    onSubmit: (values) => setData(values),
  });

  const coordinates: Coordinates | null =
    formik.values.location?.latitude && formik.values.location?.longitude
      ? {
          latitude: formik.values.location.latitude,
          longitude: formik.values.location.longitude,
        }
      : null;

  const handleLocationChange = (coords: Coordinates) => {
    formik.setFieldValue("location.latitude", coords.latitude);
    formik.setFieldValue("location.longitude", coords.longitude);
  };

  return { formik, coordinates, handleLocationChange };
};
