import { useDebounce } from "@shared/libs/hooks";
import { useCallback, useEffect, useState, type ComponentType } from "react";

type WithOnChange = { value?: unknown; onChange?: (value: unknown) => void };

export function withDebounce<TProps>(
  WrappedComponent: ComponentType<TProps>,
  delay: number = 500,
): ComponentType<TProps> {
  return function DebouncedComponent(props: TProps) {
    const { value, onChange, ...rest } = props as TProps & WithOnChange;

    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounce(localValue, delay);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    useEffect(() => {
      if (debouncedValue === value) return;
      onChange?.(debouncedValue);
    }, [debouncedValue]);

    const handleChange = useCallback((val: unknown) => {
      setLocalValue(val);
    }, []);

    return (
      <WrappedComponent
        {...(rest as TProps)}
        {...{ value: localValue, onChange: handleChange }}
      />
    );
  };
}
