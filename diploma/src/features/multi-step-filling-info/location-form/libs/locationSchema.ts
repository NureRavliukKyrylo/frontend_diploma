import * as Yup from "yup";
import type { Coordinates } from "@shared/config/types";

import type { TFunction } from "i18next";

export const getLocationSchema = (t: TFunction) =>
  Yup.object({
    coordinates: Yup.object<Coordinates>({
      latitude: Yup.number()
        .required(t("common:validation.latitudeRequired"))
        .min(-90, t("common:validation.latitudeRange"))
        .max(90, t("common:validation.latitudeRange")),
      longitude: Yup.number()
        .required(t("common:validation.longitudeRequired"))
        .min(-180, t("common:validation.longitudeRange"))
        .max(180, t("common:validation.longitudeRange")),
    }).required(t("common:validation.coordinatesRequired")),
  });
