import { useQuery } from "@tanstack/react-query";
import { profileQuery } from "../queries/getProfile";

export const useProfile = () => {
  return useQuery(profileQuery);
};
