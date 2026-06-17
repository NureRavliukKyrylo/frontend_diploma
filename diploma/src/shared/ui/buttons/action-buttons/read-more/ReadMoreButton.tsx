import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./ReadMoreButton.module.scss";

interface ReadMoreButtonProps {
  children: React.ReactNode;
  collapsedHeight?: number;
  className?: string;
  classNameButton?: string;
  buttonText?: string;
  buttonTextCollapsed?: string;
  gradientColor?: string;
}

export function ReadMoreButton({
  children,
  collapsedHeight = 80,
  className = "",
  classNameButton = "",
  buttonText,
  buttonTextCollapsed,
  gradientColor = "255, 255, 255",
}: ReadMoreButtonProps) {
  const { t } = useTranslation("common");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const resolvedButtonText = buttonText ?? t("common:actions.readMore");
  const resolvedButtonTextCollapsed =
    buttonTextCollapsed ?? t("common:actions.readLess");

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
    <div
      className={`${styles.readMoreContainer} ${className}`}
      style={{ "--gradient-color": gradientColor } as React.CSSProperties}
    >
      <motion.div
        layout
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
              layout
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
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          type="button"
        >
          {isExpanded ? resolvedButtonTextCollapsed : resolvedButtonText}
        </button>
      )}
    </div>
  );
}
