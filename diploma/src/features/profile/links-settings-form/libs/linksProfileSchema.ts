import * as Yup from "yup";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";
import { withPrivacyField } from "@shared/libs/validation";

export const linksProfileSchema = Yup.object({
  socialLinks: Yup.object(
    SOCIAL_PLATFORMS.reduce(
      (shape, { key }) => {
        shape[key] = withPrivacyField("url", "url");
        return shape;
      },
      {} as Record<string, Yup.AnySchema>,
    ),
  ),
});
