import * as yup from "yup";
import type { TFunction } from "i18next";

export const getFeedbackValidationSchema = (t: TFunction) =>
  yup.object({
    rating: yup
      .number()
      .min(1, t("feedback:validation.ratingRequired"))
      .required(),
    comment: yup.string().max(150, t("feedback:validation.commentMax")),
  });
