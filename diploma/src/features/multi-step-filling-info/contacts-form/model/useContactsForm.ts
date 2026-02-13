import { useFormik } from "formik";
import { useAuthStore } from "@entities/user";
import { contactsSchema } from "../libs/contactsSchema";
import { useSubmitFillingForm } from "@features/multi-step-filling-info/submit-form";
import { SocialPlatform } from "@shared/config/types";
import { platformKeys } from "../configs/platformKeys";
import type { UpdateUserDto } from "../../submit-form";

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

  const initialValues = Object.entries(platformKeys).reduce(
    (acc, [platformValue, key]) => {
      const platform = Number(platformValue) as SocialPlatform;
      const link = profile?.socialLinks?.find(
        (l: { platform: number }) => l.platform === platform,
      );

      const fieldName = `Profile.SocialLinks[Platform=${key}]`;
      const field = privacySettings?.fields?.find(
        (f: { fieldName: string }) => f.fieldName === fieldName,
      );

      acc[key] = link?.url;
      acc[`show${key}`] = field?.visibility === 0 || false;

      return acc;
    },
    {} as Record<string, any>,
  );

  const formik = useFormik({
    initialValues,
    validationSchema: contactsSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
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
        avatarFile: avatarFile,
        profile: {
          bio: profile?.bio,
          phone: profile?.phone,
          dateOfBirth: profile?.dateOfBirth,
          coordinates: profile?.coordinates,
          ...(profile?.socialLinks?.length
            ? { socialLinks: profile.socialLinks }
            : {}),
        },
        ...(privacySettings?.fields?.length
          ? { privacySettings: { fields: privacySettings.fields } }
          : {}),
      };

      handleSubmit(payload);
    },
  });

  return { formik, isLoading: isLoading };
};
