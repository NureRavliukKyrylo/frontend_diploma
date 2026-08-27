import { useEffect, useMemo, useState } from "react";
import type { OrganizationCategoryCarouselItem } from "./categoryCarouselTypes";

export const useCategoryGridCarousel = (
  categories: OrganizationCategoryCarouselItem[],
  cardsPerGroup: number,
) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const groupCount = Math.ceil(categories.length / cardsPerGroup);
  const visibleCards = useMemo(() => {
    const startIndex = activeGroupIndex * cardsPerGroup;
    const groupItems = categories.slice(startIndex, startIndex + cardsPerGroup);

    return Array.from(
      { length: cardsPerGroup },
      (_, index) => groupItems[index] ?? null,
    );
  }, [activeGroupIndex, cardsPerGroup, categories]);
  const isPrevDisabled = activeGroupIndex <= 0;
  const isNextDisabled =
    groupCount === 0 || activeGroupIndex >= groupCount - 1;

  useEffect(() => {
    if (groupCount === 0) {
      if (activeGroupIndex !== 0) {
        setActiveGroupIndex(0);
      }
      return;
    }
    if (activeGroupIndex >= groupCount) {
      setActiveGroupIndex(groupCount - 1);
    }
  }, [activeGroupIndex, groupCount]);

  const showPrevious = () => {
    if (!isPrevDisabled) {
      setActiveGroupIndex((current) => current - 1);
    }
  };

  const showNext = () => {
    if (!isNextDisabled) {
      setActiveGroupIndex((current) => current + 1);
    }
  };

  return {
    activeGroupIndex,
    groupCount,
    visibleCards,
    isPrevDisabled,
    isNextDisabled,
    showPrevious,
    showNext,
  };
};
