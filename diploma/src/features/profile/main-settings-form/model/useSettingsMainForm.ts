import { useFormik } from "formik";
import { profileKeys, profileQuery } from "@entities/user/profile";
import { updateProfile, type UpdateProfileDto } from "../api/updateProfileApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import {
  formatDateToInput,
  getErrorMessage,
  reverseGeocode,
} from "@shared/libs";
import { type Coordinates } from "@shared/config/types";
import { settingsMainFormSchema } from "../libs/settingsMainFormSchema";

export const useSettingsMainForm = () => {
  const { data: user } = useQuery(profileQuery.all());
  const queryClient = useQueryClient();
  const formattedDateOfBirth = formatDateToInput(user?.profile?.dateOfBirth);

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileDto) => updateProfile(data),
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

  const formik = useFormik({
    validationSchema: settingsMainFormSchema,
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      about: user?.profile?.bio ?? "",
      dateOfBirth: formattedDateOfBirth,
      avatar: user?.profile?.avatarUrl,
      coordinates: user?.profile?.coordinates ?? null,
      location: user?.location.address,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutation.mutate({
        model: {
          firstName: values.firstName,
          lastName: values.lastName,
          profile: {
            bio: values.about,
            dateOfBirth: values.dateOfBirth,
            coordinates: values.coordinates,
          },
        },
        avatarFile: values.avatar,
      });
    },
  });

  const handleLocationChange = async (coords: Coordinates) => {
    formik.setFieldValue("coordinates", coords);

    try {
      const name = await reverseGeocode(coords.latitude, coords.longitude); // 👈
      formik.setFieldValue("location", name);
    } catch {
      formik.setFieldValue("location", "Location");
    }
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
