import type { Variants, Transition, Target } from "framer-motion";

export const createLayoutTransition = (overrides?: Transition): Transition => ({
  ease: "backOut",
  duration: 0.4,
  ...overrides,
});

export const layoutTransition = createLayoutTransition();

interface FadeVariantsOptions {
  initial?: Target;
  animate?: Target;
  exit?: Target;
}

export const createFadeVariants = (overrides?: FadeVariantsOptions) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  ...overrides,
});

export const createFadeDuration = (duration = 0.2): Transition => ({
  duration,
});

export const fadeVariants = createFadeVariants();
export const fadeDuration = createFadeDuration();

interface CardVariantsOptions {
  y?: number;
  enableHover?: boolean;
  entrance?: Transition;
  hover?: Transition;
  hoverScale?: number;
}

export const createCardVariants = ({
  y = 20,
  enableHover = true,
  entrance = { duration: 0.4, ease: "easeOut" },
  hover = { ease: "easeInOut", duration: 0.2 },
  hoverScale = 1.03,
}: CardVariantsOptions = {}): Variants => ({
  hidden: { opacity: 0, y },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...entrance, delay: i * 0.06 },
  }),
  ...(enableHover && {
    hover: { scale: hoverScale, transition: hover },
  }),
});

export const staggeredCardVariants = createCardVariants();
export const staggeredCardVariantsNoHover = createCardVariants({
  enableHover: false,
});
