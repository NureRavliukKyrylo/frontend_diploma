import { HeroContent } from "./hero/HeroContent";
import { HeroNav } from "./hero/HeroNav";
import { HeroParticles } from "./hero/HeroParticles";
import { HeroTopBar } from "./hero/HeroTopBar";
import styles from "./hero/HeroSection.module.scss";

export const HeroSection = () => (
  <section className={styles.heroSection}>
    <HeroParticles />
    <HeroTopBar />
    <HeroNav />
    <HeroContent />
  </section>
);
