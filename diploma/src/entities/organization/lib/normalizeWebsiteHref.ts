export const normalizeOrganizationWebsiteHref = (website?: string | null) => {
  const value = website?.trim();

  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `https://${value}`;
};
