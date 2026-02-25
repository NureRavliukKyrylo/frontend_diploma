import { Pagination as HeroUIPagination } from "@heroui/react";
import type { ComponentProps } from "react";

type PaginationProps = ComponentProps<typeof HeroUIPagination>;

export const Pagination: React.FC<PaginationProps> = ({ ...rest }) => {
  return (
    <HeroUIPagination
      variant="flat"
      size="md"
      radius="full"
      dotsJump={3}
      siblings={1}
      boundaries={1}
      showControls={false}
      classNames={{
        wrapper: "gap-2",
        item:
          "w-12 h-12 min-w-12 rounded-full bg-white " +
          "text-[rgba(0,0,0,0.4)] font-black text-3xl " +
          "flex items-center justify-center " +
          "cursor-pointer transition-transform duration-200 [&[data-hover=true]:not([data-active=true])]:scale-110 s " +
          "shadow-[0px_2px_10px_rgba(0,0,0,0.25)]" +
          " [&[data-hover=true]:not([data-active=true])]:bg-white",

        cursor:
          "w-12 h-12 min-w-12 rounded-full bg-black text-white " +
          "font-black text-3xl flex items-center justify-center shadow-sm " +
          "cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-white " +
          "shadow-[0px_2px_10px_rgba(0,0,0,0.25)]",
        ellipsis:
          "text-[rgba(0,0,0,0.4)] font-black text-3xl cursor-default hover:bg-white",
      }}
      {...rest}
    />
  );
};
