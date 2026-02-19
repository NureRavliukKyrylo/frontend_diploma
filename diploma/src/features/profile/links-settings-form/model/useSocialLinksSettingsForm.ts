import { useFormik } from "formik";
import { useProfile } from "@entities/user/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs";
import {
  updateProfileSocialLinks,
  type UpdateProfileSocialLinksDto,
} from "../api/updateSocialLinksApi";
import { getSocialLinksInitial } from "../libs/getSocialLinksInitial";
import { buildSocialLinksPayload } from "../libs/buildSocialLinksPayload";

export const useSocialLinksSettingsForm = () => {
  const { data: user } = useProfile();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileSocialLinksDto) =>
      updateProfileSocialLinks(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      addToast({
        title: "Update Profile Success",
        description: "You have updated your profile successfully",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      addToast({
        title: "Update Profile Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const socialLinksInitial = getSocialLinksInitial(user);

  const formik = useFormik({
    initialValues: {
      socialLinks: socialLinksInitial,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const { links, privacyFields } = buildSocialLinksPayload(
        values.socialLinks,
      );

      mutation.mutate({
        profile: {
          socialLinks: links,
        },
        privacySettings: {
          fields: privacyFields,
        },
      });
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
