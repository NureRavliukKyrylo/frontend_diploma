import { BadgeCardDetailed, type Badge, type Tier } from "@entities/badge";
import { BadgesListWidget } from "@widgets/badges";
import styles from "./ProfileInventoryTab.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export const ProfileInventoryTab = () => {
  const demoBadges: Badge[] = [
    {
      id: "asdasdsd",
      image:
        "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400",
      tier: "S" as Tier,
      name: "Top-200 volunteer",
      description: "",
    },
    {
      id: "asdasdsds",
      image:
        "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=400",
      tier: "A" as Tier,
      name: "First Step",
      description: "",
    },
    {
      id: "asdasdsdd",
      image:
        "https://images.unsplash.com/photo-1614288533766-ba18c1ea0685?w=400",
      tier: "S" as Tier,
      name: "Active Heart",
      description: "",
    },
    {
      id: "asdasdsdd",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      tier: "B" as Tier,
      name: "",
      description: "",
    },
    {
      id: "asdasdssd",
      image:
        "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400",
      tier: "A" as Tier,
      name: "",
      description: "",
    },
    {
      id: "asdasdsassd",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400",
      tier: "C" as Tier,
      name: "",
      description: "",
    },
  ];
  return (
    <div className={styles.inventoryWrapper}>
      <h1 className={styles.achievementsTitle}>Achievements</h1>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <BadgesListWidget
            badges={demoBadges}
            className={styles.badgesProfileList}
            renderCard={(badge, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.06,
                }}
              >
                <BadgeCardDetailed
                  badge={badge}
                  classImgName={styles.badgeImageWrapper}
                />
              </motion.div>
            )}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
