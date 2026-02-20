import { useFormik } from "formik";
import { useAuthStore } from "@entities/user";
import { contactsSchema } from "../libs/contactsSchema";
import { useSubmitFillingForm } from "@features/multi-step-filling-info/submit-form";
import type { UpdateUserDto } from "../../submit-form";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";

export const useContactsForm = () => {
  const {
    setSocialLink,
    removePrivacyField,
    removeSocialLink,
    setPrivacyField,
    privacySettings,
    profile,
  } = useAuthStore();

  const { handleSubmit, isLoading } = useSubmitFillingForm();

  const initialValues = SOCIAL_PLATFORMS.reduce(
    (acc, { platform, key, fieldName }) => {
      const link = profile?.socialLinks?.find((l) => l.platform === platform);
      const field = privacySettings?.fields?.find(
        (f) => f.fieldName === fieldName,
      );

      acc[key] = {
        url: link?.url ?? "",
        visible: field ? field.visibility === 0 : false,
      };

      return acc;
    },
    {} as Record<string, { url: string; visible: boolean }>,
  );

  const formik = useFormik({
    initialValues,
    validationSchema: contactsSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      SOCIAL_PLATFORMS.forEach(({ platform, key, fieldName }) => {
        const { url, visible } = values[key];

        if (url) {
          setSocialLink(platform, url);
        } else {
          removeSocialLink(platform);
        }

        if (visible) {
          setPrivacyField(fieldName, { fieldName, visibility: 0 });
        } else {
          removePrivacyField(fieldName);
        }
      });

      const { avatarFile, profile, privacySettings } = useAuthStore.getState();

      const payload: UpdateUserDto = {
        avatarFile: avatarFile,
        profile: {
          bio: profile?.bio,
          phone: profile?.phone,
          dateOfBirth: profile?.dateOfBirth,
          coordinates: profile?.coordinates,
          socialLinks: profile?.socialLinks,
        },
        privacySettings: { fields: privacySettings?.fields },
      };

      handleSubmit(payload);
    },
  });

  return { formik, isLoading: isLoading };
};
