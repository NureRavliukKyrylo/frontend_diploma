import { getProfile } from "../../api/profileApi";

export const profileQuery = {
  queryKey: ["profile"],
  queryFn: getProfile,
};
