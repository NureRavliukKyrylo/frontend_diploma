import { useEffect, useState } from "react";
import clsx from "clsx";
import { toSectionId } from "../../config/faqData";
import styles from "./FaqSidebar.module.scss";

interface FaqSidebarProps {
  sections: readonly string[];
}

export const FaqSidebar = ({ sections }: FaqSidebarProps) => {
  const [activeSection, setActiveSection] = useState(sections[0] ?? "");

  useEffect(() => {
    if (!sections.includes(activeSection)) {
      setActiveSection(sections[0] ?? "");
    }
  }, [activeSection, sections]);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(toSectionId(section))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside className={styles.sidebar}>
      <p className={styles.sidebarLabel}>Sections</p>
      <nav aria-label="FAQ sections">
        {sections.map(section => (
          <button
            key={section}
            type="button"
            className={clsx(styles.navItem, {
              [styles.active]: activeSection === section,
            })}
            onClick={() => scrollToSection(section)}
          >
            <span className={styles.dot} aria-hidden="true" />
            {section}
          </button>
        ))}
      </nav>
    </aside>
  );
};
