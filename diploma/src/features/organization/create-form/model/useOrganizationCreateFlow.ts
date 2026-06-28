import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { chatKeys } from "@entities/chat";
import { organizationKeys } from "@entities/organization";
import {
  createOrganization,
  rememberOwnedOrganizationId,
  uploadOrganizationLogo,
} from "@entities/organization";
import { type User, useUserStore } from "@entities/user/profile";
import { profileKeys } from "@entities/user/profile/model/queries/profileQuery";
import { getErrorMessage } from "@shared/libs/error-message";
import type { OrganizationCreatePolicyValue } from "./types";
import { useOrganizationCreateDraftStore } from "./useOrganizationCreateDraftStore";

const MAX_CREATE_STEP = 4;

export const useOrganizationCreateFlow = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const storedUserId = useUserStore((state) => state.userId)?.trim();
  const activeStep = useOrganizationCreateDraftStore(
    (state) => state.activeStep,
  );
  const basicInfo = useOrganizationCreateDraftStore((state) => state.basicInfo);
  const brandingLogo = useOrganizationCreateDraftStore(
    (state) => state.brandingLogo,
  );
  const access = useOrganizationCreateDraftStore((state) => state.access);
  const createdOrganization = useOrganizationCreateDraftStore(
    (state) => state.createdOrganization,
  );
  const saveBrandingLogo = useOrganizationCreateDraftStore(
    (state) => state.saveBrandingLogo,
  );
  const saveAccess = useOrganizationCreateDraftStore(
    (state) => state.saveAccess,
  );
  const saveCreatedOrganization = useOrganizationCreateDraftStore(
    (state) => state.saveCreatedOrganization,
  );
  const resetDraft = useOrganizationCreateDraftStore(
    (state) => state.resetDraft,
  );
  const setActiveStep = useOrganizationCreateDraftStore(
    (state) => state.setActiveStep,
  );

  const currentStep = (
    activeStep === 4 && !createdOrganization
      ? 3
      : Math.min(Math.max(activeStep, 1), MAX_CREATE_STEP)
  ) as 1 | 2 | 3 | 4;

  const createOrganizationMutation = useMutation({
    mutationFn: async () => {
      const organizationId = await createOrganization({
        name: basicInfo.name.trim(),
        description: basicInfo.description.trim(),
        contactEmail: basicInfo.contactEmail.trim() || null,
        website: basicInfo.website.trim() || null,
        joinPolicy: access.joinPolicy,
        leavePolicy: access.leavePolicy,
      });

      let logoUploadError: string | null = null;

      if (brandingLogo instanceof File) {
        try {
          await uploadOrganizationLogo(organizationId, brandingLogo);
        } catch (error) {
          logoUploadError = getErrorMessage(error);
        }
      }

      return {
        organizationId,
        logoUploadError,
      };
    },
    onSuccess: async ({ organizationId, logoUploadError }) => {
      const currentUserId =
        storedUserId ||
        queryClient.getQueryData<User>(profileKeys.all())?.id?.trim();

      rememberOwnedOrganizationId(currentUserId, organizationId);
      saveCreatedOrganization({
        id: organizationId,
        name: basicInfo.name.trim(),
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: organizationKeys.all(),
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: profileKeys.all(),
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: chatKeys.lists(),
          refetchType: "all",
        }),
      ]);

      addToast({
        title: logoUploadError
          ? "Organization created with notes"
          : "Organization created",
        description: logoUploadError
          ? "Your organization was created, but the logo could not be uploaded right now."
          : "Your organization is ready.",
        color: logoUploadError ? "warning" : "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Creation failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const handlePreviousStep = () => {
    if (currentStep === 1) {
      void navigate({
        to: "/organizations/my",
      });
      return;
    }

    if (currentStep === 4 && createdOrganization) {
      resetDraft();
      void navigate({
        to: "/organizations/my",
      });
      return;
    }

    if (currentStep > 1) {
      setActiveStep(currentStep - 1);
    }
  };

  const handleBrandingSkip = () => {
    saveBrandingLogo(null);
    setActiveStep(3);
  };

  const handleBrandingContinue = () => {
    setActiveStep(3);
  };

  const handleAccessChange = (
    field: "joinPolicy" | "leavePolicy",
    value: OrganizationCreatePolicyValue,
  ) => {
    saveAccess({
      ...access,
      [field]: value,
    });
  };

  const handleAccessSkip = () => {
    createOrganizationMutation.mutate();
  };

  const handleAccessContinue = () => {
    createOrganizationMutation.mutate();
  };

  const handleFlowComplete = () => {
    resetDraft();
  };

  return {
    currentStep,
    access,
    createdOrganization,
    isSubmitting: createOrganizationMutation.isPending,
    handlePreviousStep,
    handleBrandingSkip,
    handleBrandingContinue,
    handleAccessChange,
    handleAccessSkip,
    handleAccessContinue,
    handleFlowComplete,
  };
};
