import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { heroNavLinks, type SectionId } from "../../../config/landingContent";
import { scrollEase } from "../../../lib/animations";
import styles from "./HeroNav.module.scss";

export const HeroNav = () => {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const sectionIds = heroNavLinks.map((link) => link.href.slice(1) as SectionId);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const getVisibleRatio = (section: HTMLElement) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      return Math.max(0, visibleHeight) / rect.height;
    };
    const observer = new IntersectionObserver(
      () => {
        const visibleSection = sections
          .map((section) => ({
            id: section.id as SectionId,
            ratio: getVisibleRatio(section),
          }))
          .filter((section) => section.ratio >= 0.3)
          .sort((a, b) => b.ratio - a.ratio)[0];

        setActiveSection(visibleSection?.id ?? null);
      },
      { root: null, rootMargin: "0px", threshold: [0, 0.3, 0.6, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const targetTop = section.getBoundingClientRect().top + window.scrollY;

    animate(window.scrollY, targetTop, {
      duration: 0.9,
      ease: scrollEase,
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };

  return (
    <header className={styles.heroNav}>
      <a className={styles.logo} href="/" aria-label="ImpactFlow home">
        IMPACTFLOW
      </a>
      <nav className={styles.heroLinks} aria-label="Landing sections">
        {heroNavLinks.map((link) => {
          const sectionId = link.href.slice(1) as SectionId;
          const isActive = activeSection === sectionId;

          return (
            <motion.a
              key={link.href}
              href={link.href}
              className={
                isActive
                  ? `${styles.heroNavLink} ${styles.activeHeroNavLink}`
                  : styles.heroNavLink
              }
              whileTap={{ scale: 0.95 }}
              onClick={(event) => {
                event.preventDefault();
                window.setTimeout(() => scrollToSection(sectionId), 120);
              }}
            >
              {link.label}
            </motion.a>
          );
        })}
      </nav>
    </header>
  );
};
