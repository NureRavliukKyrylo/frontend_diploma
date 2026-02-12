import { useFormik } from "formik";
import { useProfile } from "@entities/user/profile";
import { updateProfile, type UpdateProfileDto } from "../api/updateProfileApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs";
import { useState } from "react";

export const useSettingsMainForm = () => {
  const { data: profile } = useProfile();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileDto) => updateProfile(data),
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

  const formattedDateOfBirth = profile?.profile?.dateOfBirth
    ? new Date(profile.profile.dateOfBirth).toISOString().split("T")[0]
    : "";

  const formik = useFormik({
    initialValues: {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      about: profile?.profile?.bio ?? "",
      dateOfBirth: formattedDateOfBirth,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutation.mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        bio: values.about,
        dateOfBirth: values.dateOfBirth,
      });
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
