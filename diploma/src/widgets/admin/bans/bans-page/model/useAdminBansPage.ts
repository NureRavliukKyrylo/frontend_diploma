import {
  adminDashboardKeys,
  adminDashboardQuery,
  revokeAdminBan,
  type AdminUserListItem,
} from "@entities/admin";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  getBanIcon,
  getBanTone,
  getStatusLabel,
  getUserName,
  sortBans,
} from "../../lib/banDisplay";
import type { BanDisplay, DurationFilter, SortValue } from "../../model/types";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const useAdminBansPage = (enabled = true) => {
  const { t } = useTranslation(["admin", "common"]);
  const queryClient = useQueryClient();
  const [take, setTake] = useState(100);
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [sort, setSort] = useState<SortValue>("newest");
  const [revokeTarget, setRevokeTarget] = useState<BanDisplay | null>(null);
  const [revokeReason, setRevokeReason] = useState("");

  const bansQuery = useQuery({
    ...adminDashboardQuery.activeBans(take),
    enabled,
  });
  const usersQuery = useQuery({
    ...adminDashboardQuery.users({
      OrderBy: "Newest",
      Page: 1,
      PageSize: 500,
    }),
    enabled,
  });
  const revokeMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      revokeAdminBan(id, reason),
    onSuccess: async () => {
      addToast({
        title: t("admin:bans.revoke.success"),
        description: t("admin:bans.revoke.successText"),
        color: "success",
      });
      setRevokeTarget(null);
      setRevokeReason("");
      await queryClient.invalidateQueries({
        queryKey: adminDashboardKeys.activeBans(take),
      });
    },
    onError: (error) => {
      addToast({
        title: t("admin:bans.revoke.error"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const userMap = useMemo(() => {
    const map = new Map<string, AdminUserListItem>();
    usersQuery.data?.items.forEach((user) => {
      if (user.userId) {
        map.set(user.userId, user);
      }
    });

    return map;
  }, [usersQuery.data?.items]);

  const banDisplays = useMemo(
    () =>
      (bansQuery.data ?? []).map((ban) => {
        const tone = getBanTone(ban);

        return {
          ban,
          user: userMap.get(ban.userId),
          creator: userMap.get(ban.createdByUserId),
          tone,
          statusLabel: getStatusLabel(ban, t),
          icon: getBanIcon(tone),
        };
      }),
    [bansQuery.data, userMap],
  );

  const filteredBans = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = banDisplays.filter((item) => {
      if (duration !== "all" && item.tone !== duration) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const targetName = getUserName(item.user, item.ban.userId);
      const creatorName = getUserName(item.creator, item.ban.createdByUserId);
      const haystack = [
        item.ban.userId,
        targetName,
        item.ban.reason,
        item.ban.createdByUserId,
        creatorName,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });

    return sortBans(filtered, sort);
  }, [banDisplays, duration, search, sort]);

  const closeRevokeModal = () => {
    if (revokeMutation.isPending) {
      return;
    }

    setRevokeTarget(null);
    setRevokeReason("");
    revokeMutation.reset();
  };

  return {
    take,
    setTake,
    search,
    setSearch,
    duration,
    setDuration,
    sort,
    setSort,
    bansQuery,
    banDisplays,
    filteredBans,
    expiringSoonCount: banDisplays.filter((item) => item.tone === "soon")
      .length,
    permanentCount: banDisplays.filter((item) => item.tone === "permanent")
      .length,
    revokeTarget,
    setRevokeTarget,
    revokeReason,
    setRevokeReason,
    revokeMutation,
    closeRevokeModal,
    t,
  };
};
