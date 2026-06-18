import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getOverviewSchema = (t: TFunction) =>
  Yup.object({
    title: Yup.string()
      .max(30, t("timeBank:validation.titleMax"))
      .required(t("timeBank:validation.titleRequired")),
    description: Yup.string()
      .max(150, t("timeBank:validation.descriptionMax"))
      .required(t("timeBank:validation.descriptionRequired")),
    priceMinutes: Yup.number()
      .typeError(t("timeBank:validation.priceTypeError"))
      .min(0, t("timeBank:validation.priceNegative"))
      .required(t("timeBank:validation.priceRequired")),
    startAt: Yup.string()
      .nullable()
      .required(t("timeBank:validation.startDateRequired"))
      .test(
        "not-in-past",
        t("timeBank:validation.startDateInPast"),
        (value) => {
          if (!value) return true;
          return new Date(value) >= new Date(new Date().setHours(0, 0, 0, 0));
        },
      ),
    endAt: Yup.string()
      .nullable()
      .required(t("timeBank:validation.endDateRequired")),
    isOnline: Yup.boolean().required(),
  });

export type OverviewFormValues = Yup.InferType<
  ReturnType<typeof getOverviewSchema>
>;
