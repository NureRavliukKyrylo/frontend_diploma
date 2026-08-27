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
        wrapper: "gap-2 sm:gap-3 md:gap-4 lg:gap-5",
        item:
          "flex items-center justify-center cursor-pointer " +
          "transition-transform duration-200 " +
          "w-8 h-8 min-w-8 text-xl " +
          "sm:w-9 sm:h-9 sm:min-w-9 sm:text-2xl " +
          "md:w-10 md:h-10 md:min-w-10 md:text-2xl " +
          "lg:w-12 lg:h-12 lg:min-w-12 lg:text-3xl " +
          "rounded-full bg-white text-[rgba(0,0,0,0.4)] font-black " +
          "[&[data-hover=true]:not([data-active=true])]:scale-110 " +
          "shadow-[0px_2px_10px_rgba(0,0,0,0.25)] " +
          "[&[data-hover=true]:not([data-active=true])]:bg-white",
        cursor:
          "flex items-center justify-center cursor-pointer " +
          "transition-transform duration-200 " +
          "w-8 h-8 min-w-8 text-xl " +
          "sm:w-9 sm:h-9 sm:min-w-9 sm:text-2xl " +
          "md:w-10 md:h-10 md:min-w-10 md:text-2xl " +
          "lg:w-12 lg:h-12 lg:min-w-12 lg:text-3xl " +
          "rounded-full bg-black text-white font-black shadow-sm " +
          "hover:scale-105 hover:bg-white " +
          "shadow-[0px_2px_10px_rgba(0,0,0,0.25)]",
        ellipsis:
          "cursor-default " +
          "text-[rgba(0,0,0,0.4)] font-black " +
          "text-xl sm:text-2xl md:text-2xl lg:text-3xl " +
          "hover:bg-white",
      }}
      {...rest}
    />
  );
};
