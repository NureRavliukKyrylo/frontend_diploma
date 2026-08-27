interface ListWidgetSkeletonProps {
  renderSkeleton: () => React.ReactNode;
  items?: number;
  className?: string;
}

export const ListWidgetSkeleton = ({
  renderSkeleton,
  items = 9,
  className,
}: ListWidgetSkeletonProps) => {
  return (
    <div className={className}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};
