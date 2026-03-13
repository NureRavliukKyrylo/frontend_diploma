import * as Yup from "yup";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";
import { withPrivacyField } from "@shared/libs/validation";

export const contactsSchema = Yup.object(
  SOCIAL_PLATFORMS.reduce(
    (shape, { key }) => {
      shape[key] = withPrivacyField("url", "url");
      return shape;
    },
    {} as Record<string, Yup.AnySchema>,
  ),
);
