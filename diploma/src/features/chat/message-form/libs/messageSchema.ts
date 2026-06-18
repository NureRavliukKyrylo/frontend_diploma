import * as Yup from "yup";
import { type TFunction } from "i18next";

export const getMessageSchema = (t: TFunction) =>
  Yup.object({
    body: Yup.string().max(500, t("chat:validation.maxCharacters")),
  });
