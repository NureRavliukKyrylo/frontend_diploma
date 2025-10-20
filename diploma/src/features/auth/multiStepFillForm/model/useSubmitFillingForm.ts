import { useMutation } from "@tanstack/react-query";
import { updateUser, type UpdateUserDto } from "../api/fiillingFormApi";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "@entities/user";

export const useSubmitFillingForm = () => {
  const router = useRouter();
  const { clearFillingForm } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: UpdateUserDto) => updateUser(data),
    onSuccess: (data) => {
      console.log("[DEBUG] API success response:", data);
      addToast({
        title: "Success",
        description: "The profile was filled out successfully",
        color: "success",
      });
      clearFillingForm();
      router.navigate({ to: "/" });
    },
    onError: (error: any) => {
      console.error("[DEBUG] API error response:", error);
      const errorMessage =
        error?.response?.data?.error || "Failed to update profile";
      addToast({ title: "Error", description: errorMessage, color: "danger" });
    },
  });

  const isPayloadEmpty = (obj: any): boolean => {
    if (obj === null || obj === undefined) return true;
    if (Array.isArray(obj)) {
      return obj.every(isPayloadEmpty);
    }
    if (typeof obj === "object") {
      return Object.values(obj).every(isPayloadEmpty);
    }
    return obj === "";
  };

  const handleSubmit = (payload: UpdateUserDto) => {
    console.log("[DEBUG] Final payload (fresh state):", payload);

    if (isPayloadEmpty(payload)) {
      router.navigate({ to: "/" });
    } else {
      mutation.mutate(payload);
    }
  };

  return { handleSubmit, isLoading: mutation.isPending };
};
