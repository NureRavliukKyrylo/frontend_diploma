import { Link, useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import { motion } from "framer-motion";
import { getHeaderLinks } from "../../config/headerLinks";
import { isHeaderLinkActive } from "../../lib/header";
import styles from "./HeaderNav.module.scss";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@entities/user";

export const HeaderNav = () => {
  const location = useLocation();
  const { t } = useTranslation("common");
  const role = useUserStore((s) => s.role);
  const headerLinks = getHeaderLinks(t, role);

  return (
    <div
      className={clsx(
        styles.container,
        "max-lg:!min-h-[24px] max-lg:!px-0 max-lg:!py-0 lg:max-xl:!px-6",
      )}
    >
      <nav
        className={clsx(styles.menu, "!hidden lg:!flex lg:max-xl:!gap-8")}
        aria-label={t("header.primaryNavigation")}
      >
        {headerLinks.map(({ title, href }) => (
          <motion.span
            key={href}
            className={styles.motionItem}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 560,
              damping: 24,
              mass: 0.35,
            }}
          >
            <Link
              to={href}
              className={clsx(styles.link, "lg:max-xl:!text-[18px]")}
              data-nav={href.replace("/", "")}
              data-active={
                isHeaderLinkActive(location.pathname, href) ? "true" : undefined
              }
            >
              <span className={styles.label}>{title}</span>
            </Link>
          </motion.span>
        ))}
      </nav>
    </div>
  );
};
