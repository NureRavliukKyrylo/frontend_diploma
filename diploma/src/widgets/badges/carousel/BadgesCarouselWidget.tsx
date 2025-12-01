import { Carousel } from "@shared/ui";
import { BadgeCard } from "@entities/badge";
import type { Tier } from "@entities/badge/model/types/TierList";
import styles from "./BadgesCarouselWidget.module.scss";

const demoBadges = [
  {
    badgeImage:
      "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400",
    tier: "S" as Tier,
  },
  {
    badgeImage:
      "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=400",
    tier: "A" as Tier,
  },
  {
    badgeImage:
      "https://images.unsplash.com/photo-1614288533766-ba18c1ea0685?w=400",
    tier: "S" as Tier,
  },
  {
    badgeImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    tier: "B" as Tier,
  },
  {
    badgeImage:
      "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400",
    tier: "A" as Tier,
  },
  {
    badgeImage:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400",
    tier: "C" as Tier,
  },
];

export const BadgesCarouselWidget = () => {
  return (
    <div className={styles.badgesCarouselWidget}>
      <Carousel gap={20} minItemWidth={250}>
        {demoBadges.map((badge, i) => (
          <div className={styles.badgeCardProfileCarousel}>
            <BadgeCard
              key={i}
              badgeImage={badge.badgeImage}
              tier={badge.tier}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
