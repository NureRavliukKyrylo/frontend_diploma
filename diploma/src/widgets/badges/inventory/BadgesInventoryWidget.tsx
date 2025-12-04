import type { Badge } from "@entities/badge/model/types/Badge";
import styles from "./BadgesInventoryWidget.module.scss";
import type { Tier } from "@entities/badge/model/types/TierList";
import { BadgeCard } from "@entities/badge";
import { Link } from "@tanstack/react-router";
import { TierColors } from "@entities/badge/model/types/TierColors";

export const BadgesInventoryWidget = () => {
  const demoBadges: Badge[] = [
    {
      image:
        "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400",
      tier: "S" as Tier,
      name: "",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=400",
      tier: "A" as Tier,
      name: "",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1614288533766-ba18c1ea0685?w=400",
      tier: "S" as Tier,
      name: "",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      tier: "B" as Tier,
      name: "",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400",
      tier: "A" as Tier,
      name: "",
      description: "",
    },
    {
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400",
      tier: "C" as Tier,
      name: "",
      description: "",
    },
  ];

  return (
    <div className={styles.badgeInventory}>
      {demoBadges.map((badge, i) => (
        <div className={styles.badgeInventoryBlock}>
          <Link
            to="/badge/$badgeName"
            params={{ badgeName: badge.name }}
            className={styles.badgeCardWrapper}
          >
            <BadgeCard badge={badge} key={i} />
          </Link>
          <div className={styles.badgeInfo}>
            <h1 className={styles.badgeName}>{badge.name}</h1>
            <h1
              className={styles.badgeRank}
              style={{ color: TierColors[badge.tier] }}
            >
              RANK {badge.tier}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};
