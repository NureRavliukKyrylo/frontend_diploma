export interface AdminCategoryCardData {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
}

export const categoryFallbackGradient =
  "linear-gradient(160deg, #d8d4cc, #c2bdb2)";
