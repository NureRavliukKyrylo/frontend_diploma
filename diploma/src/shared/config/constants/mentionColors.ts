export const MENTION_COLORS = [
  "#fff0f0",
  "#f0f4ff",
  "#f0fff4",
  "#fffbf0",
  "#f8f0ff",
];

export const getMentionColor = (name: string) => {
  const index = name.charCodeAt(0) % MENTION_COLORS.length;
  return MENTION_COLORS[index];
};
