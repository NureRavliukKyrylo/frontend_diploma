import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Carousel.module.scss";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  gap?: number;
  minItemWidth?: number;
}

export function Carousel<T>({
  items,
  renderItem,
  gap = 16,
  minItemWidth = 200,
}: CarouselProps<T>) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        // Визначаємо скільки елементів вміститься
        let count = Math.floor((containerWidth + gap) / (minItemWidth + gap));
        count = Math.max(1, Math.min(count, items.length));

        // Розраховуємо точну ширину елемента
        const totalGap = gap * (count - 1);
        const calculatedWidth = (containerWidth - totalGap) / count;

        setVisibleCount(count);
        setItemWidth(calculatedWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [gap, minItemWidth, items.length]);

  const getWrappedIndex = (i: number) =>
    ((i % items.length) + items.length) % items.length;

  const paginate = (dir: number) => setIndex((prev) => prev + dir);

  const visibleItems = Array.from(
    { length: visibleCount },
    (_, i) => items[getWrappedIndex(index + i)]
  );

  const canGoPrev = items.length > visibleCount;
  const canGoNext = items.length > visibleCount;

  return (
    <div className={styles.sliderWrapper}>
      <button
        onClick={() => paginate(-1)}
        disabled={!canGoPrev}
        className={styles.navBtn}
        style={{ opacity: canGoPrev ? 1 : 0.3 }}
      >
        ⟨
      </button>

      <div ref={containerRef} className={styles.sliderContainer}>
        <div
          className={styles.itemsRow}
          style={{ display: "flex", gap, overflow: "hidden" }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleItems.map((item, i) => (
              <motion.div
                key={getWrappedIndex(index + i)}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                  minWidth: itemWidth,
                  maxWidth: itemWidth,
                }}
              >
                {renderItem(item)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() => paginate(1)}
        disabled={!canGoNext}
        className={styles.navBtn}
        style={{ opacity: canGoNext ? 1 : 0.3 }}
      >
        ⟩
      </button>
    </div>
  );
}
