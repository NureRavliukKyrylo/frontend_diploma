import * as Yup from "yup";

export const availabilitySchema = Yup.object({
  dateRange: Yup.array().of(Yup.string()).nullable(),
  startTime: Yup.string()
    .nullable()
    .when("allDay", {
      is: false,
      then: (s) => s.required("Start time is required"),
    }),
  endTime: Yup.string()
    .nullable()
    .when("allDay", {
      is: false,
      then: (s) => s.required("End time is required"),
    }),
  allDay: Yup.boolean().required(),
});
