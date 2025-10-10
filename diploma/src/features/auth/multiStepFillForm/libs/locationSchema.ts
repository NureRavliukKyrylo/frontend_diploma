import * as Yup from "yup";
import type { Coordinates } from "../../../../entities/user/store/slices/auth/fillingFormSlice";

export const locationSchema = Yup.object({
  coordinates: Yup.object<Coordinates>({
    latitude: Yup.number()
      .required("Latitude is required")
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    longitude: Yup.number()
      .required("Longitude is required")
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
  }).required("Coordinates are required"),
});
