import React from "react";
import { CircularProgress } from "@heroui/react";
import type { CircularProgressProps } from "@heroui/react";

interface BaseSpinnerProps extends CircularProgressProps {}

export const BaseSpinner: React.FC<BaseSpinnerProps> = ({
  color = "secondary",
  className,
  classNames,
  size,
  ...props
}) => {
  return (
    <CircularProgress
      color={color}
      size={size}
      className={className}
      classNames={{
        base: "flex justify-center items-center",
        svg: "w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8",
        ...classNames,
      }}
      {...props}
    />
  );
};
