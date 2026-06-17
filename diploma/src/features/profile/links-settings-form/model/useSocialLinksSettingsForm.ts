import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  updateProfileSocialLinks,
  type UpdateProfileSocialLinksDto,
} from "../api/updateSocialLinksApi";
import { getSocialLinksInitial } from "../libs/getSocialLinksInitial";
import { buildSocialLinksPayload } from "../libs/buildSocialLinksPayload";
import { getLinksProfileSchema } from "../libs/linksProfileSchema";
import { profileKeys, profileQuery } from "@entities/user/profile";
import { queryClient } from "@shared/api";
import { useTranslation } from "react-i18next";

export const useSocialLinksSettingsForm = () => {
  const { data: user } = useQuery(profileQuery.all());
  const { t } = useTranslation();
  const validationSchema = getLinksProfileSchema(t);

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileSocialLinksDto) =>
      updateProfileSocialLinks(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
      addToast({
        title: t("profile:settings.update.successTitle"),
        description: t("profile:settings.update.successDescription"),
        color: "success",
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, t);
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("profile:settings.update.action"),
        }),
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const socialLinksInitial = getSocialLinksInitial(user, t);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      socialLinks: socialLinksInitial,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const { links, privacyFields } = buildSocialLinksPayload(
        values.socialLinks,
        t,
      );

      mutation.mutate({
        model: {
          profile: {
            socialLinks: links,
          },
          privacySettings: {
            fields: privacyFields,
          },
        },
      });
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
