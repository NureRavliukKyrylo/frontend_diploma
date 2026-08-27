import { useEffect } from "react";
import type { VirtualItem } from "@tanstack/react-virtual";

interface UseMessagesInfiniteScrollProps {
  virtualItems: VirtualItem[];
  messagesLength: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasPreviousPage: boolean;
  isFetchingPreviousPage: boolean;
  fetchPreviousPage: () => void;
  messagesWrapperRef: React.RefObject<HTMLDivElement | null>;
}

export const useMessagesInfiniteScroll = ({
  virtualItems,
  messagesLength,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  hasPreviousPage,
  isFetchingPreviousPage,
  fetchPreviousPage,
  messagesWrapperRef,
}: UseMessagesInfiniteScrollProps) => {
  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();
    if (!lastItem) return;

    if (
      lastItem.index >= messagesLength - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    messagesLength,
    isFetchingNextPage,
    virtualItems,
  ]);

  useEffect(() => {
    const [firstItem] = virtualItems;
    if (!firstItem) return;

    const scrollEl = messagesWrapperRef.current;
    if (!scrollEl) return;

    if (scrollEl.scrollTop > 300) return;

    if (firstItem.index <= 5 && hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  }, [
    hasPreviousPage,
    fetchPreviousPage,
    messagesLength,
    isFetchingPreviousPage,
    virtualItems,
  ]);
};
