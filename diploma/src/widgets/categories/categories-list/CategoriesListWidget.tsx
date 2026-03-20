import type { Category } from "@entities/category";
import styles from "./CategoriesWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { QueryResult } from "@shared/config/types";

interface CategoriesListWidgetProps {
  useCategoriesQuery?: () => QueryResult<Category>;
  renderCard: (category: Category, index: number) => React.ReactNode;
  startSlot?: React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const CategoriesListWidget = ({
  useCategoriesQuery,
  renderCard,
  startSlot,
  renderSkeleton,
  skeletonItems,
  className,
}: CategoriesListWidgetProps) => {
  const queryResult = useCategoriesQuery?.();
  const categories = queryResult?.data;
  const isLoading = queryResult?.isLoading ?? false;

  const wrapperClass =
    `${styles.categoriesWidgetBlock} ${className ?? ""}`.trim();

  if (isLoading && renderSkeleton) {
    return (
      <ListWidgetSkeleton
        items={skeletonItems}
        className={className}
        renderSkeleton={renderSkeleton}
      />
    );
  }

  return (
    <div className={wrapperClass}>
      {startSlot}
      {categories?.map((category, index) => renderCard(category, index))}
    </div>
  );
};
