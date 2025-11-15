import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/profileApi";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,

    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retryOnMount: false,
    networkMode: "offlineFirst",

    retry: 1,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 4000),

    placeholderData: (prev) => prev,
  });
};
