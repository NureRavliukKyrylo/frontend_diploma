const AVATAR_COLORS: { bg: string; text: string }[] = [
  { bg: "#F28B82", text: "#7C1A14" },
  { bg: "#FBBC04", text: "#7A4F00" },
  { bg: "#FDD663", text: "#6B4A00" },
  { bg: "#81C995", text: "#1A5C2A" },
  { bg: "#4FC3F7", text: "#0B4F6C" },
  { bg: "#AEC6CF", text: "#2C4A52" },
  { bg: "#B39DDB", text: "#311B6B" },
  { bg: "#F48FB1", text: "#7B1A3A" },
  { bg: "#80DEEA", text: "#00525A" },
  { bg: "#FFAB91", text: "#7A2D00" },
];

export const getAvatarColor = (name: string) => {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};
