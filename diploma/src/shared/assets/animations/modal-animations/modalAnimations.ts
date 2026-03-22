import type { Variants } from "framer-motion";

export type ModalAnimationType = "default" | "left" | "right";

interface ModalAnimationConfig {
  overlay: Variants;
  modal: Variants;
  transition: object;
}

export const modalAnimations: Record<ModalAnimationType, ModalAnimationConfig> =
  {
    default: {
      overlay: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      modal: {
        initial: { opacity: 0, y: 20, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 1 },
      },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },

    left: {
      overlay: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      modal: {
        initial: { opacity: 0, x: "-100%" },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "-100%" },
      },
      transition: {
        type: "tween",
        ease: [0.32, 0.72, 0, 1],
        duration: 0.35,
      },
    },

    right: {
      overlay: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      modal: {
        initial: { opacity: 0, x: "100%" },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "100%" },
      },
      transition: {
        type: "spring",
        ease: [0.32, 0.72, 0, 1],
        duration: 0.5,
      },
    },
  };
