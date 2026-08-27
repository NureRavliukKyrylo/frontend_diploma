export const badgePlaceholderIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='480' viewBox='0 0 360 480'%3E%3Crect width='360' height='480' rx='24' fill='%23f4f1ea'/%3E%3Ccircle cx='180' cy='210' r='82' fill='%231a1a1a'/%3E%3Cpath d='M180 125l19 55 58 2-46 35 16 56-47-33-48 33 17-56-46-35 58-2z' fill='%23fff'/%3E%3Ctext x='180' y='342' text-anchor='middle' font-family='Arial,sans-serif' font-weight='900' font-size='28' fill='%238b0000'%3EIMPACTFLOW%3C/text%3E%3C/svg%3E";

const renderableIconPrefixes = ["http://", "https://", "data:", "blob:", "/"];

export const resolveBadgeIconUrl = (iconUrl?: string | null) => {
  const value = iconUrl?.trim();

  if (!value || value === "pending") {
    return badgePlaceholderIcon;
  }

  return renderableIconPrefixes.some((prefix) => value.startsWith(prefix))
    ? value
    : badgePlaceholderIcon;
};
