import { queryClient } from "@shared/api";
import { messageKeys } from "../model/queries/messageQuery";
import { useCallback } from "react";

export const useGetMessagesQueryKey = () => {
  return useCallback((chatId: string) => {
    const queries = queryClient.getQueryCache().findAll({
      queryKey: messageKeys.list(chatId),
      exact: false,
    });

    const infiniteQuery = queries.find(
      (q) => !(q.queryKey as unknown[]).includes("anchor"),
    );
    return infiniteQuery?.queryKey ?? messageKeys.list(chatId);
  }, []);
};
