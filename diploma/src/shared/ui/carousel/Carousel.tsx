import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Carousel.module.scss";
import { ArrowCarousel } from "@shared/assets/icons/actions";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  minItemWidth?: number;
  maxItemWidth?: number;
  keyExtractor: (item: T) => string;
}

export function Carousel<T>({
  items,
  renderItem,
  minItemWidth = 200,
  maxItemWidth = 250,
  keyExtractor,
}: CarouselProps<T>) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [direction, setDirection] = useState(1);

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateWidth = () => {
      const parent = containerRef.current?.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;

      let count = Math.floor(parentWidth / minItemWidth);
      count = Math.max(1, Math.min(count, items.length));

      const gap = 16;
      const totalGap = gap * (count - 1);
      const rawWidth = (parentWidth - totalGap) / count;
      const clampedWidth = maxItemWidth
        ? Math.min(rawWidth, maxItemWidth)
        : rawWidth;

      setVisibleCount(count);
      setItemWidth(clampedWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [minItemWidth, maxItemWidth, items.length]);

  const getWrappedIndex = (i: number) =>
    ((i % items.length) + items.length) % items.length;

  const paginate = (dir: number) => {
    setIndex((prev) => prev + dir);
    setDirection(dir);
  };

  const visibleItems = Array.from(
    { length: visibleCount },
    (_, i) => items[getWrappedIndex(index + i)],
  );

  return (
    <div ref={containerRef} className={styles.carouselWrapper}>
      <button
        onClick={() => paginate(-1)}
        className={styles.backCarouselButton}
      >
        <ArrowCarousel />
      </button>
      <div className={styles.sliderContainer}>
        <div className={styles.itemsRow}>
          <AnimatePresence initial={false} mode="popLayout">
            {visibleItems.map((item, i) => (
              <motion.div
                layout
                key={`${index + i}-${keyExtractor(item)}`}
                initial={{ opacity: 0, x: 60 * direction, scale: 0.9 }}
                exit={{ opacity: 0, x: -60 * direction, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                style={{ minWidth: itemWidth, maxWidth: itemWidth }}
              >
                {renderItem(item)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <button onClick={() => paginate(1)} className={styles.nextCarouselButton}>
        <ArrowCarousel />
      </button>
    </div>
  );
}
