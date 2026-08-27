import { Slider as HeroSlider } from "@heroui/react";
import { useDebounce } from "@shared/libs/hooks";
import { useEffect, useState } from "react";
import type { SliderProps as HeroSliderProps } from "@heroui/react";

interface SliderProps extends Omit<HeroSliderProps, "value" | "onChange"> {
  value: number;
  onChange: (value: number) => void;
  debounce?: number;
  onChangeImmediate?: (value: number) => void;
}

export const Slider = ({
  value,
  onChange,
  debounce = 500,
  onChangeImmediate,
  ...props
}: SliderProps) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, debounce);

  useEffect(() => {
    if (debouncedValue === undefined) return;
    onChange?.(debouncedValue);
  }, [debouncedValue]);

  return (
    <HeroSlider
      value={inputValue}
      onChange={(value) => {
        setInputValue(value as number);
        onChangeImmediate?.(value as number);
      }}
      classNames={{
        base: "w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        thumb: "w-5.5 h-5.5 md:w-6 md:h-6",
        track: "h-2 sm:h-1.5 md:h-2",
      }}
      {...props}
    />
  );
};
