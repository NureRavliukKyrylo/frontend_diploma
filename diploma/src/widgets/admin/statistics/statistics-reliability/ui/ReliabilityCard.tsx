import { Skeleton } from "@heroui/react";
import {
  clampPercent,
  formatNumber,
} from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

interface ReliabilityCardProps {
  score: number;
  approved: number;
  rejected: number;
  isLoading: boolean;
  isError: boolean;
}

export const ReliabilityCard = ({
  score,
  approved,
  rejected,
  isLoading,
  isError,
}: ReliabilityCardProps) => (
  <div className={styles.reliabilityCard}>
    <span className={styles.reliabilityDeco} aria-hidden="true" />
    <span className={styles.reliabilityLabel}>Reliability</span>
    {isLoading ? (
      <Skeleton className={styles.reliabilitySkeleton} />
    ) : isError ? (
      <div className={styles.darkCardState}>Reliability unavailable.</div>
    ) : (
      <>
        <div
          className={styles.reliabilityRing}
          style={{
            background: `conic-gradient(#4ade80 0% ${clampPercent(
              score,
            )}%, #2c2c2c ${clampPercent(score)}% 100%)`,
          }}
        >
          <div className={styles.reliabilityRingInner}>
            {Math.round(score)}%
          </div>
        </div>
        <div className={styles.reliabilityBreakdown}>
          <span>
            <strong className={styles.approvedValue}>{formatNumber(approved)}</strong>
            <em>Approved</em>
          </span>
          <span>
            <strong className={styles.rejectedValue}>{formatNumber(rejected)}</strong>
            <em>Rejected</em>
          </span>
        </div>
      </>
    )}
  </div>
);
