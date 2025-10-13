import * as Yup from "yup";
import { PLATFORM_CONFIG } from "../ui/configs/sociallnputConfig";

export const contactsSchema = Yup.object(
  PLATFORM_CONFIG.reduce((shape, { key }) => {
    const showKey = `show${key.charAt(0).toUpperCase() + key.slice(1)}`;
    shape[key] = Yup.string().url("Enter a valid link");
    shape[showKey] = Yup.boolean().required();
    return shape;
  }, {} as Record<string, Yup.AnySchema>)
);
