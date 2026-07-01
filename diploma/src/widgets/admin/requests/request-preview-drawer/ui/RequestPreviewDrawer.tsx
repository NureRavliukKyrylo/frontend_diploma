import type { AdminRequestListItem } from "@entities/admin";
import { getDrawerToneClass } from "../../requests-config/libs/requestDrawerHelpers";
import type {
  CategoryNameMap,
  DecisionAction,
} from "../../requests-config/libs/requestTypeConfig";
import {
  fallbackVisual,
  requestVisuals,
} from "../../requests-config/libs/requestVisualConfig";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { RequestDrawerBody } from "./RequestDrawerBody";
import { RequestDrawerFooter } from "./RequestDrawerFooter";
import { RequestDrawerHeader } from "./RequestDrawerHeader";

interface RequestPreviewDrawerProps {
  request: AdminRequestListItem | null;
  categoryMap: CategoryNameMap;
  onClose: () => void;
  onDecide: (action: DecisionAction) => void;
  isDecisionPending: boolean;
  decisionComment: string;
  onDecisionCommentChange: (value: string) => void;
  assignToTask: boolean;
  onAssignToTaskChange: (value: boolean) => void;
}

export const RequestPreviewDrawer = ({
  request,
  categoryMap,
  onClose,
  onDecide,
  isDecisionPending,
  decisionComment,
  onDecisionCommentChange,
  assignToTask,
  onAssignToTaskChange,
}: RequestPreviewDrawerProps) => {
  if (!request) {
    return null;
  }

  const visual = requestVisuals[request.typeName] ?? fallbackVisual;
  const drawerToneClass = styles[getDrawerToneClass(request.typeName)];

  return (
    <div className={styles.requestDrawerBackdrop} onClick={onClose}>
      <aside
        className={`${styles.requestDrawer} ${drawerToneClass}`}
        onClick={(event) => event.stopPropagation()}
      >
        <RequestDrawerHeader
          request={request}
          visual={visual}
          onClose={onClose}
        />
        <RequestDrawerBody
          request={request}
          categoryMap={categoryMap}
          decisionComment={decisionComment}
          onDecisionCommentChange={onDecisionCommentChange}
          assignToTask={assignToTask}
          onAssignToTaskChange={onAssignToTaskChange}
        />
        <RequestDrawerFooter
          request={request}
          onDecide={onDecide}
          isDecisionPending={isDecisionPending}
        />
      </aside>
    </div>
  );
};
