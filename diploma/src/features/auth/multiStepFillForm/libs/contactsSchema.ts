import * as Yup from "yup";
import { PLATFORM_CONFIG } from "../ui/configs/sociallnputConfig";

export const contactsSchema = Yup.object(
  PLATFORM_CONFIG.reduce((shape, { key }) => {
    const showKey = `show${key}`;
    shape[key] = Yup.string().when(showKey, {
      is: true,
      then: (schema) =>
        schema
          .required("This field is required because the switch is enabled")
          .url("Please enter a valid URL"),
      otherwise: (schema) => schema.optional().url("Please enter a valid URL"),
    });

    shape[showKey] = Yup.boolean().required();

    return shape;
  }, {} as Record<string, Yup.AnySchema>)
);
