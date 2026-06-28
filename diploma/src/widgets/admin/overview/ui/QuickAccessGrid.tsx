import { Skeleton } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { quickAccessItems } from "../config/quickAccessItems";
import { getFooterClassName } from "../lib/overviewData";
import type {
  AdminOverviewStyles,
  FooterSource,
  FooterValue,
} from "../model/types";

interface QuickAccessGridProps {
  styles: AdminOverviewStyles;
  footerValues: Record<FooterSource, FooterValue>;
}

export const QuickAccessGrid = ({
  styles,
  footerValues,
}: QuickAccessGridProps) => (
  <div className={styles.quickGrid}>
    {quickAccessItems.map((item) => {
      const Icon = item.icon;
      const footer = item.footerSource
        ? footerValues[item.footerSource]
        : undefined;

      return (
        <Link
          key={item.href}
          to={item.href}
          className={`${styles.quickCard} ${styles[`quickCard_${item.tone}`]}`}
        >
          <span className={styles.quickDeco} aria-hidden="true" />
          <span className={styles.quickIcon}>
            <Icon size={28} aria-hidden="true" />
          </span>
          <span className={styles.quickTitle}>{item.title}</span>
          <span className={styles.quickDesc}>{item.description}</span>
          <span
            className={`${styles.quickFooter} ${
              footer ? "" : styles.quickFooterEnd
            }`}
          >
            {footer ? (
              footer.isLoading ? (
                <Skeleton className={styles.quickFooterSkeleton} />
              ) : footer.isError ? (
                <span className={styles.quickFooterError}>Unavailable</span>
              ) : (
                <span
                  className={`${styles.quickFooterValue} ${getFooterClassName(
                    styles,
                    item.footerTone,
                  )}`}
                >
                  {footer.value}
                </span>
              )
            ) : null}
            <span className={styles.quickFooterAction}>
              {item.footerAction}
            </span>
          </span>
        </Link>
      );
    })}
  </div>
);
