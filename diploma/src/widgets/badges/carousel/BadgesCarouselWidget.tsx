import { Carousel } from "@shared/ui";
import { BadgeCard } from "@entities/badge";
import styles from "./BadgesCarouselWidget.module.scss";
import type { Badge } from "@entities/badge/model/types/Badge";
import { motion } from "framer-motion";
import type { BadgesQueryResult } from "@entities/badge/model";

interface BadgesCarouselWidgetProps {
  useBadgesQuery?: () => BadgesQueryResult;
  badges?: Badge[];
  minItemWidth?: number;
}

export const BadgesCarouselWidget = ({
  useBadgesQuery,
  badges: staticBadges,
  minItemWidth = 230,
}: BadgesCarouselWidgetProps) => {
  const queryResult = useBadgesQuery?.();
  const badges = staticBadges ?? queryResult?.data;

  return (
    <Carousel
      items={badges ?? []}
      keyExtractor={(badge) => badge.id}
      renderItem={(badge) => (
        <motion.div
          whileHover={{
            scale: 1.05,
            y: -5,
            filter: "drop-shadow(0 8px 16px rgba(255,255,255,0.2))",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={styles.wrapperCarouselCard}
        >
          <BadgeCard badge={badge} />
        </motion.div>
      )}
      minItemWidth={minItemWidth}
    />
  );
};
