import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { profileQuery } from "../queries/profileQuery";
import { useUserStore } from "../store/userInfoStore";

export const useSyncUserInfoFromProfile = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setSystemRole = useUserStore((state) => state.setSystemRole);
  const { data: user } = useQuery({
    ...profileQuery.all(),
    enabled: isAuthenticated === true,
  });

  useEffect(() => {
    if (user) {
      setSystemRole(user.roleName);
    }
  }, [setSystemRole, user]);
};
