import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs";
import {
  updateProfileSocialLinks,
  type UpdateProfileSocialLinksDto,
} from "../api/updateSocialLinksApi";
import { getSocialLinksInitial } from "../libs/getSocialLinksInitial";
import { buildSocialLinksPayload } from "../libs/buildSocialLinksPayload";
import { linksProfileSchema } from "../libs/linksProfileSchema";
import { profileKeys, profileQuery } from "@entities/user/profile";

export const useSocialLinksSettingsForm = () => {
  const { data: user } = useQuery(profileQuery.all());
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileSocialLinksDto) =>
      updateProfileSocialLinks(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
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
    validationSchema: linksProfileSchema,
    initialValues: {
      socialLinks: socialLinksInitial,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const { links, privacyFields } = buildSocialLinksPayload(
        values.socialLinks,
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
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
