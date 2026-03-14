import type { Category, CategoriesQueryResult } from "@entities/category";
import styles from "./CategoriesWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

interface CategoriesListWidgetProps {
  useCategoriesQuery?: () => CategoriesQueryResult;
  renderCard: (category: Category) => React.ReactNode;
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
      {categories?.map((category) => renderCard(category))}
    </div>
  );
};
