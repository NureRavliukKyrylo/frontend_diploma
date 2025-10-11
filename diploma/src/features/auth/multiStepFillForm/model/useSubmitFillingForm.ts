import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../../entities/user";
import { updateUser, type UpdateUserDto } from "../api/fiillingFormApi";
import { addToast } from "@heroui/react";

export const useSubmitFillingForm = () => {
  const email = useAuthStore((state) => state.email);
  const profile = useAuthStore((state) => state.profile);
  const privacySettings = useAuthStore((state) => state.privacySettings);

  const mutation = useMutation({
    mutationFn: (data: UpdateUserDto) => updateUser(data),
    onSuccess: (data) => {
      console.log("[DEBUG] API success response:", data);
      addToast({
        title: "Success",
        description: "Profile updated",
        color: "success",
      });
    },
    onError: (error: any) => {
      console.error("[DEBUG] API error response:", error);
      const errorMessage =
        error?.response?.data?.error || "Failed to update profile";
      addToast({ title: "Error", description: errorMessage, color: "danger" });
    },
  });

  const handleSubmit = () => {
    const payload: UpdateUserDto = {
      email,
      profile: {
        bio: profile.bio,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        telegram: profile.telegram,
        coordinates: profile.coordinates,
      },
      privacySettings: {
        fields: privacySettings.fields,
      },
    };

    console.log("[DEBUG] Submitting payload:", payload);
    console.log("[DEBUG] Current auth state:", {
      email,
      profile,
      privacySettings,
    });

    mutation.mutate(payload);
  };

  return { handleSubmit, isLoading: mutation.isPending };
};
