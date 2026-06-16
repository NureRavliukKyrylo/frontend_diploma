import * as Yup from "yup";
import { getSocialPlatforms } from "@shared/config/constants";
import { withPrivacyField } from "@shared/libs/validation";
import type { TFunction } from "i18next";

export const getLinksProfileSchema = (t: TFunction) => {
  const socialPlatforms = getSocialPlatforms(t);
  return Yup.object(
    socialPlatforms.reduce(
      (shape, { key }) => {
        shape[key] = withPrivacyField("url", "url");
        return shape;
      },
      {} as Record<string, Yup.AnySchema>,
    ),
  );
};
