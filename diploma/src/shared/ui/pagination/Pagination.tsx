import { Pagination as HeroUIPagination } from "@heroui/react";
import type { ComponentProps } from "react";

type PaginationProps = ComponentProps<typeof HeroUIPagination>;

export const Pagination: React.FC<PaginationProps> = ({ ...rest }) => {
  return (
    <HeroUIPagination
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
      {...rest}
    />
  );
};
