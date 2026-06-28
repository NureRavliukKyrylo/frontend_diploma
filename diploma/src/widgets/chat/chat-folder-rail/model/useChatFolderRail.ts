import { useEffect, useState } from "react";
import type { RelatedEntityTypeChatValue } from "@entities/chat";

export const useChatFolderRail = (
  entityTypes: RelatedEntityTypeChatValue[],
) => {
  const firstType = entityTypes[0] ?? "event";
  const [activeType, setActiveType] = useState<RelatedEntityTypeChatValue>(
    firstType,
  );

  useEffect(() => {
    if (!entityTypes.includes(activeType)) {
      setActiveType(firstType);
    }
  }, [activeType, entityTypes, firstType]);

  return { activeType, setActiveType };
};
