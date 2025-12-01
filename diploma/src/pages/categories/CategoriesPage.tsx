import { CategoriesWidget } from "@widgets/categories";
import { type Category } from "@entities/category";

export function CategoriesPage() {
  const demoCategories: Category[] = [
    {
      categoryName: "Food",
      categoryBackground: "https://placehold.co/600x400",
    },
    {
      categoryName: "Eco",
      categoryBackground: "https://placehold.co/600x400/00ff99/000",
    },
    {
      categoryName: "Animals",
      categoryBackground: "https://placehold.co/600x400/ff0099/000",
    },
    {
      categoryName: "Education",
      categoryBackground: "https://placehold.co/600x400/0099ff/000",
    },
    {
      categoryName: "Healthcare",
      categoryBackground: "https://placehold.co/600x400/f4a460/000",
    },
    {
      categoryName: "Community",
      categoryBackground: "https://placehold.co/600x400/00ced1/000",
    },
  ];

  return <CategoriesWidget categories={demoCategories} />;
}
