import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import type { ReactNode } from "react";
import type { SearchablePage } from "../../config/searchablePages";
import styles from "./HeaderSearch.module.scss";

const normalizeSearchValue = (value: string) => value.trim().toLowerCase();

const renderHighlightedText = (text: string, search: string): ReactNode => {
  const normalizedSearch = normalizeSearchValue(search);
  if (!normalizedSearch) return text;

  const lowerText = text.toLowerCase();
  const segments: ReactNode[] = [];
  let currentIndex = 0;
  let matchIndex = lowerText.indexOf(normalizedSearch);

  while (matchIndex !== -1) {
    if (matchIndex > currentIndex) {
      segments.push(text.slice(currentIndex, matchIndex));
    }

    const matchEnd = matchIndex + normalizedSearch.length;
    segments.push(
      <mark key={`${text}-${matchIndex}`} className={styles.searchMatch}>
        {text.slice(matchIndex, matchEnd)}
      </mark>,
    );
    currentIndex = matchEnd;
    matchIndex = lowerText.indexOf(normalizedSearch, currentIndex);
  }

  if (currentIndex < text.length) segments.push(text.slice(currentIndex));
  return segments;
};

interface HeaderSearchResultsProps {
  pages: SearchablePage[];
  search: string;
  onSelect: (page: SearchablePage) => void;
}

export const HeaderSearchResults = ({
  pages,
  search,
  onSelect,
}: HeaderSearchResultsProps) => (
  <div className={styles.searchResultsList} role="listbox">
    {pages.length > 0 ? (
      pages.map((page, index) => (
        <motion.button
          key={`${page.title}-${page.to}`}
          type="button"
          role="option"
          className={styles.searchResultItem}
          onClick={() => onSelect(page)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.14,
            delay: Math.min(index * 0.02, 0.12),
            ease: "easeOut",
          }}
        >
          <span className={styles.searchResultIcon}>
            <page.Icon aria-hidden="true" strokeWidth={1.8} />
          </span>
          <span className={styles.searchResultText}>
            <span>{renderHighlightedText(page.title, search)}</span>
            <span>{page.description}</span>
          </span>
        </motion.button>
      ))
    ) : (
      <motion.div
        className={styles.searchEmptyState}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        <span className={styles.searchEmptyIcon}>
          <SearchX aria-hidden="true" strokeWidth={1.8} />
        </span>
        <span>No results found</span>
        <span>Try Profile, Calendar, Map, Projects, or Skills.</span>
      </motion.div>
    )}
  </div>
);
