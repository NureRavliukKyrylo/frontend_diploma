import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getAvailabilitySchema = (t: TFunction) =>
  Yup.object({
    dateRange: Yup.array().of(Yup.string()).nullable(),
    startTime: Yup.string()
      .nullable()
      .when("allDay", {
        is: false,
        then: (s) => s.required(t("calendar:validation.startTimeRequired")),
      }),
    endTime: Yup.string()
      .nullable()
      .when("allDay", {
        is: false,
        then: (s) => s.required(t("calendar:validation.endTimeRequired")),
      }),
    allDay: Yup.boolean().required(),
  });
