import type { Dispatch, SetStateAction } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  archiveOrganization,
  deleteOrganizationLogo,
  organizationKeys,
  updateOrganization,
  uploadOrganizationLogo,
  type Organization,
} from "@entities/organization";
import { buildOrganizationSettingsPayload } from "../lib/buildOrganizationSettingsPayload";
import type { OrganizationSettingsValues } from "./types";

interface UseOrganizationSettingsMutationsProps {
  organizationId: string;
  organization?: Organization | null;
  setCurrentLogoUrl: Dispatch<SetStateAction<string | null>>;
  setLogoObjectUrl: Dispatch<SetStateAction<string | null>>;
  setIsArchiveModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useOrganizationSettingsMutations = ({
  organizationId,
  organization,
  setCurrentLogoUrl,
  setLogoObjectUrl,
  setIsArchiveModalOpen,
}: UseOrganizationSettingsMutationsProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateDetailsMutation = useMutation({
    mutationFn: (formValues: OrganizationSettingsValues) => {
      if (!organization) throw new Error("Organization is not loaded.");
      return updateOrganization(
        buildOrganizationSettingsPayload(organization, formValues),
      );
    },
    onSuccess: async () => {
      if (!organization) return;

      await queryClient.invalidateQueries({
        queryKey: organizationKeys.details(organization.id),
      });
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all() });

      addToast({ title: "Changes saved", color: "success" });
    },
    onError: () => {
      addToast({ title: "Something went wrong", color: "danger" });
    },
  });

  const uploadLogoMutation = useMutation({
    mutationFn: (file: File) => uploadOrganizationLogo(organizationId, file),
    onSuccess: async (logoUrl) => {
      setLogoObjectUrl(null);

      if (logoUrl) {
        setCurrentLogoUrl(logoUrl);
        queryClient.setQueryData<Organization | null>(
          organizationKeys.details(organizationId),
          (previous) => (previous ? { ...previous, logoUrl } : previous),
        );
      }

      await queryClient.invalidateQueries({
        queryKey: organizationKeys.details(organizationId),
      });

      addToast({ title: "Logo uploaded", color: "success" });
    },
    onError: () => {
      setLogoObjectUrl(null);
      addToast({ title: "Something went wrong", color: "danger" });
    },
  });

  const deleteLogoMutation = useMutation({
    mutationFn: () => deleteOrganizationLogo(organizationId),
    onSuccess: async () => {
      setCurrentLogoUrl(null);
      queryClient.setQueryData<Organization | null>(
        organizationKeys.details(organizationId),
        (previous) => (previous ? { ...previous, logoUrl: null } : previous),
      );

      await queryClient.invalidateQueries({
        queryKey: organizationKeys.details(organizationId),
      });

      addToast({ title: "Logo removed", color: "success" });
    },
    onError: () => {
      addToast({ title: "Something went wrong", color: "danger" });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: () => archiveOrganization(organizationId),
    onSuccess: async () => {
      setIsArchiveModalOpen(false);

      await queryClient.invalidateQueries({
        queryKey: organizationKeys.all(),
        refetchType: "none",
      });

      addToast({ title: "Organization archived", color: "success" });
      await navigate({ to: "/organizations" });
    },
    onError: () => {
      addToast({ title: "Something went wrong", color: "danger" });
    },
  });

  return {
    updateDetailsMutation,
    uploadLogoMutation,
    deleteLogoMutation,
    archiveMutation,
  };
};
