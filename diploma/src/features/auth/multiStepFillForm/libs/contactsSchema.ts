import * as Yup from "yup";
import { PLATFORM_CONFIG } from "../ui/configs/sociallnputConfig";

const contactsShape = PLATFORM_CONFIG.reduce((shape, { key }) => {
  const showKey = `show${key.charAt(0).toUpperCase() + key.slice(1)}`;
  shape[key] = Yup.string().url("Enter a valid link");
  shape[showKey] = Yup.boolean().required();
  return shape;
}, {} as Record<string, Yup.AnySchema>);

export const contactsSchema = Yup.object(contactsShape).test({
  name: "at-least-one-link",
  message: "Please provide at least one social media link",
  test: function (value: { [key: string]: any }) {
    const isAtLeastOneLinkProvided = PLATFORM_CONFIG.some(
      ({ key }) => !!value[key]
    );

    if (isAtLeastOneLinkProvided) {
      return true;
    }

    const firstFieldKey = PLATFORM_CONFIG[0]?.key;
    if (firstFieldKey) {
      return this.createError({
        path: firstFieldKey,
      });
    }

    return true;
  },
});
