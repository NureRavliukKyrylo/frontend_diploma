import { useFormik } from "formik";
import { useProfile } from "@entities/user/profile";
import { updateProfile, type UpdateProfileDto } from "../api/updateProfileApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs";
import type { Coordinates } from "@shared/config/types";

export const useSettingsMainForm = () => {
  const { data: user } = useProfile();
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

  const handleLocationChange = (coords: Coordinates) => {
    formik.setFieldValue("coordinates", coords);
    console.log(formik.values.coordinates);
  };

  const handleFileChange = (file: File | null) => {
    formik.setFieldValue("avatar", file);
  };

  const formattedDateOfBirth = user?.profile?.dateOfBirth
    ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0]
    : "";

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      about: user?.profile?.bio ?? "",
      dateOfBirth: formattedDateOfBirth,
      avatar: user?.profile?.avatarUrl,
      coordinates: user?.profile?.coordinates ?? null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutation.mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        profile: {
          bio: values.about,
          dateOfBirth: values.dateOfBirth,
          avatarUrl: values.avatar,
          coordinates: values.coordinates,
        },
      });
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleLocationChange,
    handleFileChange,
  };
};
