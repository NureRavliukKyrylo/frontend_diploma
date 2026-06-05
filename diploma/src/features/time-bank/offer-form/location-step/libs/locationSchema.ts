import * as Yup from "yup";

export const locationSchema = Yup.object({
  location: Yup.object({
    latitude: Yup.number()
      .nullable()
      .required("Please pick a location on the map"),
    longitude: Yup.number()
      .nullable()
      .required("Please pick a location on the map"),
  }),
});
