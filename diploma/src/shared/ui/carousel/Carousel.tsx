import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Carousel.module.scss";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  visibleCount?: number;
  gap?: number;
}

export function Carousel<T>({
  items,
  renderItem,
  visibleCount = 1,
  gap = 16,
}: CarouselProps<T>) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const totalGap = gap * (visibleCount - 1);
      setItemWidth(
        (containerRef.current.offsetWidth - totalGap) / visibleCount
      );
    }
  }, [visibleCount, gap]);

  const getWrappedIndex = (i: number) =>
    ((i % items.length) + items.length) % items.length;

  const paginate = (dir: number) => setIndex((prev) => prev + dir);

  const visibleItems = Array.from(
    { length: visibleCount },
    (_, i) => items[getWrappedIndex(index + i)]
  );

  return (
    <div className={styles.sliderWrapper}>
      <button onClick={() => paginate(-1)} className={styles.navBtn}>
        ⟨
      </button>

      <div ref={containerRef} className={styles.sliderContainer}>
        <div
          className={styles.itemsRow}
          style={{ display: "flex", gap, overflow: "hidden" }}
        >
          <AnimatePresence initial={false}>
            {visibleItems.map((item, i) => (
              <motion.div
                key={getWrappedIndex(index + i)}
                layout // ✨ Items smoothly reflow, no jump
                initial={{ opacity: 0, x: 50 }} // only new items animate!
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }} // leaving item animates out
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

      <button onClick={() => paginate(1)} className={styles.navBtn}>
        ⟩
      </button>
    </div>
  );
}
