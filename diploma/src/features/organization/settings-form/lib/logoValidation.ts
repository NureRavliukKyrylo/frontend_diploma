export const allowedOrganizationLogoTypes = ["image/jpeg", "image/png", "image/webp"];

export const maxOrganizationLogoSize = 2 * 1024 * 1024;

export const getOrganizationLogoValidationError = (file: File) => {
  if (!allowedOrganizationLogoTypes.includes(file.type)) {
    return "Unsupported file format";
  }

  if (file.size > maxOrganizationLogoSize) {
    return "File too large";
  }

  return null;
};
