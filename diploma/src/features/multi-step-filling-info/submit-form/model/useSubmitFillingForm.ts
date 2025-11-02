import { useMutation } from "@tanstack/react-query";
import { updateUser, type UpdateUserDto } from "../api/fiillingFormApi";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "@entities/user";
import { isPayloadEmpty } from "@shared/libs";

export const useSubmitFillingForm = () => {
  const router = useRouter();
  const { clearFillingForm, setLoading } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: UpdateUserDto) => updateUser(data),
    onMutate: () => setLoading(true),
    onSettled: () => setLoading(false),
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
