import { useFormik } from "formik";
import { useAuthStore } from "../../../../entities/user";
import { contactsSchema } from "../libs/contactsSchema";
import { useSubmitFillingForm } from "./useSubmitFillingForm";
import { useRouter } from "@tanstack/react-router";
import { SocialPlatform } from "../../../../shared/enums";
import { platformKeys } from "./constants/platformKeys";

export const useContactsForm = () => {
  const { setSocialLink, setPrivacyField, privacySettings, profile } =
    useAuthStore();
  const { handleSubmit } = useSubmitFillingForm();
  const router = useRouter();

  const initialValues = Object.entries(platformKeys).reduce(
    (acc, [platformValue, key]) => {
      const platform = Number(platformValue) as SocialPlatform;
      const link = profile?.socialLinks?.find((l) => l.platform === platform);

      const fieldName = `Platform.${key[0].toUpperCase() + key.slice(1)}`;
      const field = privacySettings?.fields?.find(
        (f) => f.fieldName === fieldName
      );

      acc[key] = link?.url;
      acc[`show${key[0].toUpperCase() + key.slice(1)}`] =
        field?.visibility === 1 || false;

      return acc;
    },
    {} as Record<string, any>
  );

  const formik = useFormik({
    initialValues,
    validationSchema: contactsSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("[DEBUG] Submitting form:", values);

      Object.entries(platformKeys).forEach(([platformValue, key]) => {
        const platform = Number(platformValue) as SocialPlatform;
        const fieldName = `Platform.${key[0].toUpperCase() + key.slice(1)}`;
        const showKey = `show${key[0].toUpperCase() + key.slice(1)}`;
        const url = values[key];

        if (url) {
          setSocialLink(platform, url);
        }

        if (values[showKey]) {
          setPrivacyField(fieldName, {
            fieldName,
            visibility: 1,
          });
        }
      });

      handleSubmit();
    },
  });

  return formik;
};
