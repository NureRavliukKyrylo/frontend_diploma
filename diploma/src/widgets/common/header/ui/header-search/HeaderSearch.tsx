import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { Search } from "lucide-react";
import {
  searchablePages,
  type SearchablePage,
} from "../../config/searchablePages";
import { HeaderSearchResults } from "./HeaderSearchResults";
import styles from "./HeaderSearch.module.scss";

interface HeaderSearchProps {
  variant?: "desktop" | "drawer";
  value?: string;
  onValueChange?: (value: string) => void;
  onNavigate?: () => void;
}

export const HeaderSearch = ({
  variant = "desktop",
  value,
  onValueChange,
  onNavigate,
}: HeaderSearchProps) => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [internalSearch, setInternalSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isDrawer = variant === "drawer";
  const search = value ?? internalSearch;
  const setSearch = (nextValue: string) => {
    if (value === undefined) setInternalSearch(nextValue);
    onValueChange?.(nextValue);
  };
  const filteredPages = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return normalized
      ? searchablePages.filter((page) =>
          page.title.toLowerCase().includes(normalized),
        )
      : searchablePages;
  }, [search]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!formRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectPage = (page: SearchablePage) => {
    setIsOpen(false);
    setSearch("");
    onNavigate?.();
    void navigate({ to: page.to as never, search: page.search as never });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filteredPages[0]) selectPage(filteredPages[0]);
    else setIsOpen(true);
  };

  return (
    <form
      ref={formRef}
      className={clsx(
        isDrawer ? styles.drawerSearchForm : styles.searchBarBlock,
      )}
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search"
        aria-label="Global site search"
        className={isDrawer ? styles.drawerSearchInput : styles.searchInput}
        value={search}
        aria-expanded={isOpen}
        aria-controls={`header-${variant}-search-results`}
        onChange={(event) => {
          setSearch(event.target.value);
          setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
      />
      <button
        type="submit"
        className={isDrawer ? styles.drawerSearchButton : styles.searchButton}
        aria-label="Search site"
      >
        <Search className={styles.searchIcon} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`header-${variant}-search-results`}
            className={clsx(
              styles.searchDropdown,
              isDrawer && styles.drawerSearchDropdown,
            )}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className={styles.searchDropdownHeader}>
              <span>Site pages</span>
              <span className={styles.searchCount}>{filteredPages.length}</span>
            </div>
            <HeaderSearchResults
              pages={filteredPages}
              search={search}
              onSelect={selectPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};
