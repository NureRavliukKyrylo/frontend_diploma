/// <reference types="vite/client" />

declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "lodash/throttle" {
  type ThrottleOptions = {
    leading?: boolean;
    trailing?: boolean;
  };

  type ThrottledFunction<T extends (...args: any[]) => unknown> = T & {
    cancel: () => void;
    flush: () => ReturnType<T>;
  };

  const throttle: <T extends (...args: any[]) => unknown>(
    func: T,
    wait?: number,
    options?: ThrottleOptions,
  ) => ThrottledFunction<T>;

  export default throttle;
}
