import { useEffect, useState } from "react";
import clsx from "clsx";
import type { TermsSectionData } from "../../config/termsData";
import styles from "./TermsToc.module.scss";

type TermsTocItem = Pick<TermsSectionData, "id" | "num" | "navLabel">;

interface TermsTocProps {
  sections: readonly TermsTocItem[];
}

export const TermsToc = ({ sections }: TermsTocProps) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const headings = sections
      .map(section =>
        document.querySelector<HTMLElement>(
          `[data-terms-section-heading="${section.id}"]`,
        ),
      )
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (headings.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const activeHeading = entries.find(entry => entry.isIntersecting);
        const sectionId =
          activeHeading?.target.getAttribute("data-terms-section-heading");

        if (sectionId) {
          setActiveId(sectionId);
        }
      },
      {
        rootMargin: "-88px 0px -72% 0px",
        threshold: 0,
      },
    );

    headings.forEach(heading => observer.observe(heading));

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside className={styles.toc}>
      <p className={styles.label}>Sections</p>
      <nav aria-label="Terms of service sections">
        {sections.map(section => (
          <button
            key={section.id}
            type="button"
            className={clsx(styles.item, {
              [styles.active]: activeId === section.id,
            })}
            onClick={() => scrollToSection(section.id)}
          >
            <span className={styles.num}>{section.num}</span>
            {section.navLabel}
          </button>
        ))}
      </nav>
    </aside>
  );
};
