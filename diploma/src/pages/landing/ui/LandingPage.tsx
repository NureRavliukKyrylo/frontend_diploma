import { useState } from "react";
import { hasLoadingScreenPlayed, LoadingScreen } from "@widgets/loading-screen";
import { ActivitiesSection } from "./sections/ActivitiesSection";
import { CtaSection } from "./sections/CtaSection";
import { GamificationSection } from "./sections/GamificationSection";
import { GridBackground } from "./sections/GridBackground";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { StatsSection } from "./sections/StatsSection";
import { TimeBankSection } from "./sections/TimeBankSection";
import styles from "./LandingPage.module.scss";

const handleLandingReveal = () => undefined;

export function LandingPage() {
  const [skipLoader] = useState(hasLoadingScreenPlayed);

  return (
    <main className={styles.landingPage}>
      {!skipLoader && <LoadingScreen onReveal={handleLandingReveal} />}
      <GridBackground />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <TimeBankSection />
      <ActivitiesSection />
      <GamificationSection />
      <CtaSection />
    </main>
  );
}
