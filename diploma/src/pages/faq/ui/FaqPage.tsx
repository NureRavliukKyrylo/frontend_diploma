import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LegalHeader } from "@widgets/common";
import {
  FAQ_DATA,
  FAQ_SECTIONS,
  FaqAccordion,
  FaqCategories,
  FaqCta,
  FaqHero,
  FaqSearch,
  FaqSidebar,
  toSectionId,
  type FaqCategory,
} from "@widgets/faq";
import styles from "./FaqPage.module.scss";

const normalizeSearchValue = (value: string) => value.trim().toLowerCase();

export const FaqPage = () => {
  const [activeCategory, setActiveCategory] =
    useState<FaqCategory>("all");
  const [openId, setOpenId] = useState<string | null>("1");
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = useMemo(() => {
    const query = normalizeSearchValue(searchValue);

    return FAQ_DATA.filter(item => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchValue]);

  const sections = FAQ_SECTIONS.filter(section =>
    filteredItems.some(item => item.section === section),
  );

  return (
    <div className={styles.page}>
      <LegalHeader />

      <div className={styles.content}>
        <FaqHero />
        <FaqSearch value={searchValue} onChange={setSearchValue} />
        <FaqCategories
          active={activeCategory}
          onChange={setActiveCategory}
        />

        {sections.length > 0 ? (
          <div className={styles.layout}>
            <FaqSidebar sections={sections} />

            <div className={styles.questions}>
              <AnimatePresence initial={false} mode="popLayout">
                {sections.map(section => (
                  <motion.section
                    key={section}
                    id={toSectionId(section)}
                    className={styles.section}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className={styles.sectionHead}>
                      <div className={styles.sectionLine} />
                      <h2 className={styles.sectionText}>{section}</h2>
                      <div className={styles.sectionLine} />
                    </div>
                    <FaqAccordion
                      items={filteredItems.filter(
                        item => item.section === section,
                      )}
                      openId={openId}
                      onToggle={setOpenId}
                    />
                  </motion.section>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>No answers found</span>
            <p>Try another search phrase or choose a different category.</p>
          </motion.div>
        )}
      </div>

      <div className={styles.ctaWrapper}>
        <FaqCta />
      </div>
    </div>
  );
};
