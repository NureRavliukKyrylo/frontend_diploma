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
      {...props}
    />
  );
};
