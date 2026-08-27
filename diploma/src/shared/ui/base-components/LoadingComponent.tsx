import type { CircularProgressProps } from "@heroui/react";
import { BaseSpinner } from "../spinner/BaseSpinner";

interface BaseSpinnerProps extends CircularProgressProps {}

interface LoadingComponentProps {
  className?: string;
  spinnerClassNames?: BaseSpinnerProps["classNames"];
}

export const LoadingComponent = ({
  className = "flex justify-center items-center w-full h-full min-h-screen",
  spinnerClassNames = {
    svg: "w-5 h-5 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 text-purple-400",
  },
}: LoadingComponentProps) => {
  return (
    <div className={className}>
      <BaseSpinner classNames={spinnerClassNames} />
    </div>
  );
};
