import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import styles from "./GetStartedStep.module.scss";

type GetStartedRoute =
  | "/organizations/$id/projects/create"
  | "/organizations/$id/events/create"
  | "/organizations/$id"
  | "/organizations/$id/members";

interface GetStartedChecklistItemProps {
  to: GetStartedRoute;
  params: { id: string };
  icon: ReactNode;
  title: string;
  description: string;
  onComplete: () => void;
}

export const GetStartedChecklistItem = ({
  to,
  params,
  icon,
  title,
  description,
  onComplete,
}: GetStartedChecklistItemProps) => (
  <Link
    to={to}
    params={params}
    className={styles.checklistItem}
    onClick={onComplete}
  >
    <span className={styles.checklistIcon}>{icon}</span>
    <span className={styles.checklistText}>
      <span className={styles.checklistTitle}>{title}</span>
      <span className={styles.checklistDesc}>{description}</span>
    </span>
    <IconArrowRight
      className={styles.checklistArrow}
      size={18}
      aria-hidden="true"
    />
  </Link>
);
