import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getLocationSchema = (t: TFunction) =>
  Yup.object({
    location: Yup.object({
      latitude: Yup.number()
        .nullable()
        .required(t("timeBank:validation.locationRequired")),
      longitude: Yup.number()
        .nullable()
        .required(t("timeBank:validation.locationRequired")),
    })
      .nullable()
      .required(t("timeBank:validation.locationRequired")),
  });
