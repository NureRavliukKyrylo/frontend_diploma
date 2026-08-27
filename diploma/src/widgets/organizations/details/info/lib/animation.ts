import type { TargetAndTransition, Variants } from "framer-motion";

export interface OrganizationDetailsAnimationConfig {
  prefersReducedMotion: boolean;
  containerVariants: Variants;
  blockVariants: Variants;
  summaryVariants: Variants;
  nestedContainerVariants: Variants;
  sideRevealVariants: Variants;
  subtleHover?: TargetAndTransition;
  buttonHover?: TargetAndTransition;
}

export const createOrganizationDetailsAnimationConfig = (
  prefersReducedMotion: boolean,
): OrganizationDetailsAnimationConfig => {
  const containerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.04,
          },
        },
      };

  const blockVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.48,
            ease: "easeOut",
          },
        },
      };

  const summaryVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.52,
            ease: "easeOut",
          },
        },
      };

  const nestedContainerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.05,
          },
        },
      };

  const sideRevealVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, x: 0 },
        visible: { opacity: 1, x: 0 },
      }
    : {
        hidden: { opacity: 0, x: 26 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            stiffness: 180,
            damping: 20,
            mass: 0.95,
          },
        },
      };

  const subtleHover: TargetAndTransition | undefined = prefersReducedMotion
    ? undefined
    : {
        y: -3,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      };

  const buttonHover: TargetAndTransition | undefined = prefersReducedMotion
    ? undefined
    : {
        y: -2,
        scale: 1.02,
        transition: {
          duration: 0.18,
          ease: "easeOut",
        },
      };

  return {
    prefersReducedMotion,
    containerVariants,
    blockVariants,
    summaryVariants,
    nestedContainerVariants,
    sideRevealVariants,
    subtleHover,
    buttonHover,
  };
};
