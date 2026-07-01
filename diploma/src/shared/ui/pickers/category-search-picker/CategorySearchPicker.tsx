import { categoryQuery } from "@entities/category";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import styles from "./CategorySearchPicker.module.scss";
import { useTranslation } from "react-i18next";

interface CategorySearchPickerProps {
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

interface CategoryOption {
  id: string;
  name: string;
}

const normalizeText = (value: string) => value.trim().toLowerCase();

const renderHighlightedName = (name: string, query: string) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return name;
  }

  const index = name.toLowerCase().indexOf(normalizedQuery);

  if (index < 0) {
    return name;
  }

  return (
    <>
      {name.slice(0, index)}
      <span className={styles.pickerOptionHighlight}>
        {name.slice(index, index + normalizedQuery.length)}
      </span>
      {name.slice(index + normalizedQuery.length)}
    </>
  );
};

export const CategorySearchPicker = ({
  value,
  onChange,
  multiple = true,
  placeholder,
}: CategorySearchPickerProps) => {
  const { t } = useTranslation("category");
  const resolvedPlaceholder = placeholder ?? t("picker.search");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const categoriesQuery = useQuery(
    categoryQuery.list({ OrderBy: "NameAsc", Page: 1, PageSize: 200 }),
  );
  const categories: CategoryOption[] = useMemo(
    () =>
      (categoriesQuery.data?.data ?? []).map((category) => ({
        id: category.id,
        name: category.name,
      })),
    [categoriesQuery.data?.data],
  );
  const selectedCategories = useMemo(
    () => categories.filter((category) => value.includes(category.id)),
    [categories, value],
  );
  const filteredCategories = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return categories.filter((category) => {
      if (value.includes(category.id)) {
        return false;
      }

      return normalizedSearch
        ? category.name.toLowerCase().includes(normalizedSearch)
        : true;
    });
  }, [categories, search, value]);

  const updatePosition = useCallback(() => {
    const rect = wrapperRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    setPosition({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (
        target &&
        (wrapperRef.current?.contains(target) ||
          dropdownRef.current?.contains(target))
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const openPicker = () => {
    updatePosition();
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const selectCategory = (category: CategoryOption) => {
    if (multiple) {
      onChange([...value, category.id]);
      setSearch("");
      setActiveIndex(0);
      setIsOpen(true);
      inputRef.current?.focus();
      return;
    }

    onChange([category.id]);
    setSearch("");
    setActiveIndex(0);
    setIsOpen(false);
  };

  const removeCategory = (categoryId: string) => {
    onChange(value.filter((selectedId) => selectedId !== categoryId));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (!isOpen && (event.key === "ArrowDown" || event.key === "Enter")) {
      setIsOpen(true);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        Math.min(current + 1, Math.max(filteredCategories.length - 1, 0)),
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const activeCategory = filteredCategories[activeIndex];

      if (activeCategory) {
        selectCategory(activeCategory);
      }
    }
  };

  const singleSelectedName = !multiple ? selectedCategories[0]?.name : "";

  return (
    <div ref={wrapperRef} className={styles.pickerWrapper}>
      <div className={styles.pickerInput} onClick={openPicker}>
        {multiple ? (
          selectedCategories.map((category) => (
            <span key={category.id} className={styles.pickerChip}>
              {category.name}
              <button
                type="button"
                className={styles.pickerChipRemove}
                onClick={(event) => {
                  event.stopPropagation();
                  removeCategory(category.id);
                }}
                aria-label={t("picker.remove", { name: category.name })}
              >
                x
              </button>
            </span>
          ))
        ) : singleSelectedName ? (
          <span className={styles.singleValue}>{singleSelectedName}</span>
        ) : null}
        <input
          ref={inputRef}
          className={styles.pickerTextInput}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selectedCategories.length ? "" : resolvedPlaceholder}
        />
      </div>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            className={styles.pickerDropdown}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            {categoriesQuery.isLoading ? (
              <div className={styles.pickerEmptyState}>
                {t("picker.loading")}
              </div>
            ) : filteredCategories.length ? (
              filteredCategories.map((category, index) => (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.pickerOption} ${
                    index === activeIndex ? styles.pickerOptionActive : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    selectCategory(category);
                  }}
                >
                  {renderHighlightedName(category.name, search)}
                </button>
              ))
            ) : (
              <div className={styles.pickerEmptyState}>{t("picker.empty")}</div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
};
