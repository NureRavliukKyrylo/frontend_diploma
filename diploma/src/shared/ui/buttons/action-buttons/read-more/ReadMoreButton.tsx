import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ReadMoreButton.module.scss";

interface ReadMoreButtonProps {
  children: React.ReactNode;
  collapsedHeight?: number;
  className?: string;
  classNameButton?: string;
  buttonText?: string;
  buttonTextCollapsed?: string;
}

export function ReadMoreButton({
  children,
  collapsedHeight = 80,
  className = "",
  classNameButton = "",
  buttonText = "Read more",
  buttonTextCollapsed = "Read less",
}: ReadMoreButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        setShowButton(contentHeight > collapsedHeight);
      }
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [collapsedHeight, children]);

  return (
    <div className={`${styles.readMoreContainer} ${className}`}>
      <motion.div
        ref={contentRef}
        className={styles.content}
        initial={false}
        animate={{
          height: showButton && !isExpanded ? collapsedHeight : "auto",
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
        <AnimatePresence>
          {showButton && !isExpanded && (
            <motion.div
              className={styles.gradient}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      {showButton && (
        <button
          className={`${styles.readMoreButton} ${classNameButton}`}
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
        >
          {isExpanded ? buttonTextCollapsed : buttonText}
        </button>
      )}
    </div>
  );
}
