import type { Variants } from "framer-motion";

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const surfaceVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const carouselGridVariants: Variants = {
  enter: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.01,
    },
  },
  center: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const rowsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
};

export const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const carouselFrameVariants: Variants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? 38 : -38,
    scale: 0.986,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    scale: 0.992,
    filter: "blur(3px)",
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 1, 1],
    },
  }),
};
