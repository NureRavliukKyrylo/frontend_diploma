import { useState } from "react";

export const useOrganizationDetailsUiState = () => {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  return {
    descriptionExpanded,
    setDescriptionExpanded,
    isSubscribed,
    setIsSubscribed,
    isNotificationsEnabled,
    setIsNotificationsEnabled,
    showMeta,
    setShowMeta,
    isLeaveModalOpen,
    setIsLeaveModalOpen,
  };
};
