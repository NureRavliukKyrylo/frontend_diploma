import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { getDecisionToastTitle } from "@widgets/admin/requests/requests-config/libs/requestHelpers";
import type { AdminRequestTypeName } from "@entities/admin";
import type { TFunction } from "i18next";

export const notifyDecisionSuccess = (
  action: "approve" | "reject",
  t: TFunction,
  title?: string,
) => {
  addToast({
    title: getDecisionToastTitle(action, t),
    description: title
      ? t(
          action === "approve"
            ? "admin:requests.notifications.approved"
            : "admin:requests.notifications.rejected",
          { title },
        )
      : t(
          action === "approve"
            ? "admin:requests.notifications.requestApproved"
            : "admin:requests.notifications.requestRejected",
        ),
    color: "success",
  });
};

export const notifyApprovalSideEffect = (
  typeName: AdminRequestTypeName,
  t: TFunction,
) => {
  if (typeName === "categoryCreation") {
    addToast({
      title: t("admin:requests.notifications.categoryCreated"),
      description: t("admin:requests.notifications.categoryCreatedText"),
      color: "success",
    });
  }

  if (typeName === "skillCreation") {
    addToast({
      title: t("admin:requests.notifications.skillCreated"),
      description: t("admin:requests.notifications.skillCreatedText"),
      color: "success",
    });
  }
};

export const notifyDecisionFailure = (
  action: "approval" | "rejection",
  error: unknown,
  t: TFunction,
) => {
  addToast({
    title: t("admin:requests.decision.failed", {
      action: t(`admin:requests.decision.${action}`),
    }),
    description: getErrorMessage(error, t),
    color: "danger",
  });
};
