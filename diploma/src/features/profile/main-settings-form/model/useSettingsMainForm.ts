import { useFormik } from "formik";
import { useProfile } from "@entities/user/profile";
import { updateProfile, type UpdateProfileDto } from "../api/updateProfileApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { formatDateToInput, getErrorMessage } from "@shared/libs";
import { type Coordinates } from "@shared/config/types";
import { settingsMainFormSchema } from "../libs/settingsMainFormSchema";

export const useSettingsMainForm = () => {
  const { data: user } = useProfile();
  const queryClient = useQueryClient();
  const formattedDateOfBirth = formatDateToInput(user?.profile?.dateOfBirth);

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

  const formik = useFormik({
    validationSchema: settingsMainFormSchema,
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
        avatarFile: values.avatar,
        profile: {
          bio: values.about,
          dateOfBirth: values.dateOfBirth,
          coordinates: values.coordinates,
        },
      });
    },
  });

  const handleLocationChange = (coords: Coordinates) => {
    formik.setFieldValue("coordinates", coords);
  };

  const handleFileChange = (file: File | null) => {
    formik.setFieldValue("avatar", file, true);
  };

  return {
    formik,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleLocationChange,
    handleFileChange,
  };
};
