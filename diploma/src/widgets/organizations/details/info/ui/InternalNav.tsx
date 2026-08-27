import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { OrganizationDetailsTab } from "../config/tabs";
import styles from "./InternalNav.module.scss";

interface AvailableTab {
  label: string;
  value: OrganizationDetailsTab;
}

interface OrganizationDetailsInternalNavProps {
  availableTabs: AvailableTab[];
  activeTab: OrganizationDetailsTab;
  onTabChange: (nextTab: OrganizationDetailsTab) => void;
  prefersReducedMotion: boolean;
}

export const OrganizationDetailsInternalNav = ({
  availableTabs,
  activeTab,
  onTabChange,
  prefersReducedMotion,
}: OrganizationDetailsInternalNavProps) => {
  const { t } = useTranslation("organizations");
  const visibleTabsCount = availableTabs.length;

  const navStyle = {
    "--org-tabs-font-size":
      visibleTabsCount <= 5
        ? "clamp(18px, 1.5vw, 25px)"
        : visibleTabsCount === 6
          ? "clamp(16px, 1.25vw, 22px)"
          : "clamp(14px, 1.05vw, 18px)",
    "--org-tabs-active-padding-inline":
      visibleTabsCount <= 5
        ? "clamp(42px, 5vw, 80px)"
        : visibleTabsCount === 6
          ? "clamp(32px, 3.8vw, 64px)"
          : "clamp(22px, 2.7vw, 48px)",
  } as CSSProperties;

  return (
    <div className={styles.internalNavRow} style={navStyle}>
      <div
        className={styles.internalNav}
        role="tablist"
        aria-label={t("details.tabs.overview")}
      >
        {availableTabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <motion.button
              key={tab.value}
              layout={!prefersReducedMotion}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.internalTab} ${
                isActive ? styles.internalTabActive : ""
              }`}
              onClick={() => onTabChange(tab.value)}
              whileHover={
                !prefersReducedMotion && !isActive ? { scale: 1.02 } : undefined
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      layout: {
                        type: "spring",
                        stiffness: 600,
                        damping: 40,
                        mass: 0.6,
                      },
                      scale: {
                        duration: 0.1,
                        ease: "easeOut",
                      },
                      backgroundColor: {
                        duration: 0.15,
                        ease: "easeOut",
                      },
                    }
              }
            >
              {isActive ? (
                <motion.span
                  layoutId="orgTabIndicator"
                  className={styles.internalTabIndicator}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 600,
                          damping: 40,
                          mass: 0.6,
                        }
                  }
                />
              ) : null}

              <motion.span
                key={`${tab.value}-${isActive ? "active" : "inactive"}`}
                className={styles.internalTabLabel}
                initial={
                  prefersReducedMotion
                    ? false
                    : isActive
                      ? { color: "#FFFFFF", opacity: 0.6, scale: 0.95 }
                      : { color: "#000000", opacity: 1, scale: 1 }
                }
                animate={{
                  color: isActive ? "#FFFFFF" : "#000000",
                  opacity: isActive ? 1 : 0.7,
                  scale: isActive ? 1 : 0.97,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: isActive ? 0.2 : 0.15,
                        ease: "easeOut",
                      }
                }
              >
                {t(tab.label)}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
