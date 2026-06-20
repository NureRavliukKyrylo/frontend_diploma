import * as Yup from "yup";
import { getSocialPlatforms } from "@shared/config/constants";
import { withPrivacyField } from "@shared/libs/validation";
import type { TFunction } from "i18next";

export const getLinksProfileSchema = (t: TFunction) => {
  const socialPlatforms = getSocialPlatforms(t);

  const socialLinksShape = socialPlatforms.reduce(
    (shape, { key }) => {
      shape[key] = withPrivacyField("url", "url", t);
      return shape;
    },
    {} as Record<string, Yup.AnySchema>,
  );

  return Yup.object({
    socialLinks: Yup.object().shape(socialLinksShape),
  });
};
