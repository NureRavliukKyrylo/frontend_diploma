import type { Dispatch, SetStateAction } from "react";
import { addToast } from "@heroui/react";
import { getOrganizationLogoValidationError } from "../lib/logoValidation";

interface UseOrganizationLogoHandlersProps {
  currentLogoUrl: string | null;
  setLogoObjectUrl: Dispatch<SetStateAction<string | null>>;
  setLogoCropUrl: Dispatch<SetStateAction<string | null>>;
  uploadLogo: (file: File) => void;
  deleteLogo: () => void;
}

export const useOrganizationLogoHandlers = ({
  currentLogoUrl,
  setLogoObjectUrl,
  setLogoCropUrl,
  uploadLogo,
  deleteLogo,
}: UseOrganizationLogoHandlersProps) => {
  const handleLogoSelect = (file: File | null) => {
    if (!file) return;

    const validationError = getOrganizationLogoValidationError(file);
    if (validationError) {
      addToast({ title: validationError, color: "danger" });
      return;
    }

    setLogoCropUrl(URL.createObjectURL(file));
  };

  const handleLogoCropClose = () => {
    setLogoCropUrl(null);
  };

  const handleLogoCropSave = (file: File) => {
    setLogoCropUrl(null);
    setLogoObjectUrl(URL.createObjectURL(file));
    uploadLogo(file);
  };

  const handleLogoRemove = () => {
    setLogoObjectUrl(null);

    if (!currentLogoUrl) return;
    deleteLogo();
  };

  return {
    handleLogoSelect,
    handleLogoCropClose,
    handleLogoCropSave,
    handleLogoRemove,
  };
};
