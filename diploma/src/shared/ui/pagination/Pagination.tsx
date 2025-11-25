import { Pagination as HeroUIPagination } from "@heroui/react";

interface PaginationProps {
  total: number;
  initialPage?: number;
  page?: number;
  onChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  initialPage = 1,
  page,
  onChange,
}) => {
  return (
    <HeroUIPagination
      total={total}
      initialPage={initialPage}
      page={page}
      onChange={onChange}
      variant="flat"
      color="default"
      size="md"
      radius="sm"
      siblings={1}
      boundaries={1}
      showControls={true}
      classNames={{
        wrapper: "gap-1",
        item: "w-9 h-9 min-w-9 bg-transparent text-gray-600 font-medium hover:bg-gray-100",
        cursor: "bg-black text-white font-medium shadow-sm",
        prev: "w-9 h-9 min-w-9 bg-transparent hover:bg-gray-100",
        next: "w-9 h-9 min-w-9 bg-transparent hover:bg-gray-100",
        ellipsis: "text-gray-400",
      }}
    />
  );
};
