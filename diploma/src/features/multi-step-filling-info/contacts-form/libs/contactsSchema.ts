import * as Yup from "yup";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";

export const contactsSchema = Yup.object(
  SOCIAL_PLATFORMS.reduce(
    (shape, { key }) => {
      shape[key] = Yup.object({
        url: Yup.string().when("visible", {
          is: true,
          then: (schema) =>
            schema
              .required("This field is required because the switch is enabled")
              .url("Please enter a valid URL"),
          otherwise: (schema) =>
            schema.optional().url("Please enter a valid URL"),
        }),
        visible: Yup.boolean().required(),
      });

      return shape;
    },
    {} as Record<string, Yup.AnySchema>,
  ),
);
