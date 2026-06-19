import { useUploadImage } from "@features/profile/upload-image/model/useUploadImage";
import { useOrganizationCreateDraftStore } from "./useOrganizationCreateDraftStore";

const LOGO_MAX_SIZE = 2 * 1024 * 1024;
const LOGO_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const useOrganizationCreateBrandingUpload = () => {
  const brandingLogo = useOrganizationCreateDraftStore(
    (state) => state.brandingLogo,
  );
  const saveBrandingLogo = useOrganizationCreateDraftStore(
    (state) => state.saveBrandingLogo,
  );

  const upload = useUploadImage({
    src: brandingLogo,
    onChange: saveBrandingLogo,
    maxSize: LOGO_MAX_SIZE,
    formats: LOGO_FORMATS,
    sizeMessage: "Logo must be up to 2MB",
    formatMessage: "Use JPG, PNG or WEBP image",
  });

  return {
    ...upload,
    handleRemove: () => saveBrandingLogo(null),
  };
};
