import { useFormik } from "formik";
import { useAuthStore } from "../../../../entities/user";
import { contactsSchema } from "../libs/contactsSchema";
import { useSubmitFillingForm } from "./useSubmitFillingForm";
import { SocialPlatform } from "../../../../shared/enums";
import { platformKeys } from "./constants/platformKeys";
import type { UpdateUserDto } from "../api/fiillingFormApi";

export const useContactsForm = () => {
  const {
    setSocialLink,
    removePrivacyField,
    removeSocialLink,
    setPrivacyField,
    privacySettings,
    profile,
  } = useAuthStore();
  const { handleSubmit } = useSubmitFillingForm();

  const initialValues = Object.entries(platformKeys).reduce(
    (acc, [platformValue, key]) => {
      const platform = Number(platformValue) as SocialPlatform;
      const link = profile?.socialLinks?.find((l) => l.platform === platform);

      const fieldName = `Profile.SocialLinks[Platform=${key}]`;
      const field = privacySettings?.fields?.find(
        (f) => f.fieldName === fieldName
      );

      acc[key] = link?.url;
      acc[`show${key}`] = field?.visibility === 0 || false;

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
        const fieldName = `Profile.SocialLinks[Platform=${key}]`;
        const showKey = `show${key}`;
        const url = values[key];

        if (url) {
          setSocialLink(platform, url);
        } else {
          removeSocialLink(platform);
        }

        if (values[showKey]) {
          setPrivacyField(fieldName, { fieldName, visibility: 0 });
        } else {
          removePrivacyField(fieldName);
        }
      });

      const { avatarFile, profile, privacySettings } = useAuthStore.getState();

      const payload: UpdateUserDto = {
        avatarFile: avatarFile ?? null,
        profile: {
          bio: profile?.bio,
          phone: profile?.phone,
          dateOfBirth: profile?.dateOfBirth,
          socialLinks: profile?.socialLinks,
          coordinates: profile?.coordinates,
        },
        privacySettings: {
          fields: privacySettings?.fields,
        },
      };

      console.log("[DEBUG] Final payload (fresh state):", payload);
      handleSubmit(payload);
    },
  });

  return formik;
};
