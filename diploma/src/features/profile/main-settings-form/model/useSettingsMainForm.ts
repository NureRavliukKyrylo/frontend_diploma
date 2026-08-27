import { useFormik } from "formik";
import { profileKeys, profileQuery } from "@entities/user/profile";
import { updateProfile, type UpdateProfileDto } from "../api/updateProfileApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { type Coordinates } from "@shared/config/types";
import { getSettingsMainFormSchema } from "../libs/settingsMainFormSchema";
import { formatDateToInput } from "@shared/libs/date";
import { getErrorMessage } from "@shared/libs/error-message";
import { reverseGeocode } from "@shared/libs/map";
import { queryClient } from "@shared/api";
import { useTranslation } from "react-i18next";

export const useSettingsMainForm = () => {
  const { data: user } = useQuery(profileQuery.all());
  const { t } = useTranslation(["profile", "common"]);
  const formattedDateOfBirth = formatDateToInput(user?.profile?.dateOfBirth);
  const validationSchema = getSettingsMainFormSchema(t);
  const mutation = useMutation({
    mutationFn: (data: UpdateProfileDto) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
      addToast({
        title: t("settings.update.successTitle"),
        description: t("settings.update.successDescription"),
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("settings.update.action"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      about: user?.profile?.bio ?? "",
      dateOfBirth: formattedDateOfBirth,
      avatar: user?.profile?.avatarUrl,
      coordinates: user?.profile?.coordinates ?? null,
      location: user?.location?.address,
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
      const name = await reverseGeocode(coords.latitude, coords.longitude);
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
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
    handleLocationChange,
    handleFileChange,
  };
};
