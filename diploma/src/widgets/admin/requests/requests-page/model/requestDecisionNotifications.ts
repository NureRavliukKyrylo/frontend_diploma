import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { getDecisionToastTitle } from "@widgets/admin/requests/requests-config/libs/requestHelpers";
import type { AdminRequestTypeName } from "@entities/admin";
import type { TFunction } from "i18next";

export const notifyDecisionSuccess = (
  action: "approve" | "reject",
  title?: string,
) => {
  addToast({
    title: getDecisionToastTitle(action),
    description: title
      ? `${title} was ${action === "approve" ? "approved" : "rejected"}.`
      : `Request ${action === "approve" ? "approved" : "rejected"}.`,
    color: "success",
  });
};

export const notifyApprovalSideEffect = (typeName: AdminRequestTypeName) => {
  if (typeName === "categoryCreation") {
    addToast({
      title: "Category created",
      description: "The category catalog now includes this request.",
      color: "success",
    });
  }

  if (typeName === "skillCreation") {
    addToast({
      title: "Skill created",
      description: "The skill catalog now includes this request.",
      color: "success",
    });
  }
};

export const notifyDecisionFailure = (
  action: "Approval" | "Rejection",
  error: unknown,
  t: TFunction<"common">,
) => {
  addToast({
    title: `${action} failed`,
    description: getErrorMessage(error, t),
    color: "danger",
  });
};
