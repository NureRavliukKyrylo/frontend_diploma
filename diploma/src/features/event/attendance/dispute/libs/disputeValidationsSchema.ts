import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getDisputeValidationSchema = (t: TFunction) =>
  Yup.object({
    comment: Yup.string()
      .required(t("event:dispute.validation.commentRequired"))
      .max(50, t("event:dispute.validation.commentMax")),
  });
