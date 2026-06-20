import { useFormik } from "formik";
import { useAuthStore } from "@entities/user";
import { getContactsSchema } from "../libs/contactsSchema";
import { useSubmitFillingForm } from "@features/multi-step-filling-info/submit-form";
import type { UpdateUserDto } from "../../submit-form";
import { getSocialPlatforms } from "@shared/config/constants";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation(["common", "auth"]);
  const socialPlatforms = getSocialPlatforms(t);
  const validationSchema = getContactsSchema(t);

  const initialValues = socialPlatforms.reduce(
    (acc, { platform, key, fieldName }) => {
      const link = profile?.socialLinks?.find((l) => l.platform === platform);
      const field = privacySettings?.fields?.find(
        (f) => f.fieldName === fieldName,
      );

      acc[key] = {
        url: link?.url ?? "",
        visible: field ? field.visibility === "private" : false,
      };

      return acc;
    },
    {} as Record<string, { url: string; visible: boolean }>,
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      socialPlatforms.forEach(({ platform, key, fieldName }) => {
        const { url, visible } = values[key];

        if (url) {
          setSocialLink(platform, url);
        } else {
          removeSocialLink(platform);
        }

        if (visible) {
          setPrivacyField(fieldName, { fieldName, visibility: "public" });
        } else {
          removePrivacyField(fieldName);
        }
      });

      const { avatarFile, profile, privacySettings } = useAuthStore.getState();

      const payload: UpdateUserDto = {
        avatarFile: avatarFile,
        model: {
          profile: {
            bio: profile?.bio,
            phone: profile?.phone,
            dateOfBirth: profile?.dateOfBirth,
            coordinates: profile?.coordinates,
            socialLinks: profile?.socialLinks,
          },
          privacySettings: {
            fields:
              privacySettings?.fields?.map((field) => ({
                fieldName: field.fieldName,
                visibility: field.visibility === "private" ? 1 : 0,
              })) ?? [],
          },
        },
      };

      handleSubmit(payload);
    },
  });

  return { formik, isLoading: isLoading };
};
