import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Carousel.module.scss";
import { ArrowCarousel } from "@shared/assets/icons/actions";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  minItemWidth?: number;
  keyExtractor: (item: T) => string;
}

export function Carousel<T>({
  items,
  renderItem,
  minItemWidth = 200,
  keyExtractor,
}: CarouselProps<T>) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        let count = Math.floor(containerWidth / minItemWidth);
        count = Math.max(1, Math.min(count, items.length));

        const calculatedWidth = containerWidth / count;

        setVisibleCount(count);
        setItemWidth(calculatedWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [minItemWidth, items.length]);

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
  console.log(index);
  return (
    <div className={styles.carouselWrapper}>
      <button
        onClick={() => paginate(-1)}
        className={styles.backCarouselButton}
      >
        <ArrowCarousel />
      </button>

      <div ref={containerRef} className={styles.sliderContainer}>
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
        <ArrowCarousel className={styles.nextCarouselImage} />
      </button>
    </div>
  );
}
