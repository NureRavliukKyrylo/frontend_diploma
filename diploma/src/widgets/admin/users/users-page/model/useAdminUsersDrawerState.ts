import type { AdminUserListItem } from "@entities/admin";
import { useEffect, useState } from "react";

export const useAdminUsersDrawerState = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [roleModalUser, setRoleModalUser] = useState<AdminUserListItem | null>(null);
  const [messageUser, setMessageUser] = useState<AdminUserListItem | null>(null);
  const [copiedUserId, setCopiedUserId] = useState<string | null>(null);
  const [lifetimeExpanded, setLifetimeExpanded] = useState(false);
  const [showActivityCounters, setShowActivityCounters] = useState(false);

  useEffect(() => {
    setCopiedUserId(null);
    setLifetimeExpanded(false);
    setShowActivityCounters(false);
  }, [selectedUserId]);

  const copyUserId = async (userId: string) => {
    try {
      await navigator.clipboard?.writeText(userId);
    } finally {
      setCopiedUserId(userId);
      window.setTimeout(() => {
        setCopiedUserId((current) => (current === userId ? null : current));
      }, 1500);
    }
  };

  return {
    selectedUserId,
    setSelectedUserId,
    roleModalUser,
    setRoleModalUser,
    messageUser,
    setMessageUser,
    copiedUserId,
    lifetimeExpanded,
    setLifetimeExpanded,
    showActivityCounters,
    setShowActivityCounters,
    copyUserId,
  };
};
