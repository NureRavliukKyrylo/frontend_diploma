import {
  adminDashboardKeys,
  adminRequestKeys,
  approveAdminRequest,
  rejectAdminRequest,
  type AdminRequestListItem,
} from "@entities/admin";
import { chatKeys } from "@entities/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { requiresPreviewDecision } from "@widgets/admin/requests/requests-config/libs/requestHelpers";
import type {
  DecisionAction,
  DecisionTarget,
} from "@widgets/admin/requests/requests-config/libs/requestTypeConfig";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  notifyApprovalSideEffect,
  notifyDecisionFailure,
  notifyDecisionSuccess,
} from "./requestDecisionNotifications";

export const useRequestDecisionFlow = () => {
  const { t } = useTranslation(["admin", "common"]);
  const queryClient = useQueryClient();
  const [decisionTarget, setDecisionTarget] = useState<DecisionTarget | null>(
    null,
  );
  const [previewRequest, setPreviewRequest] =
    useState<AdminRequestListItem | null>(null);
  const [decisionComment, setDecisionComment] = useState("");
  const [drawerDecisionComment, setDrawerDecisionComment] = useState("");
  const [assignToTask, setAssignToTask] = useState(true);
  const [drawerAssignToTask, setDrawerAssignToTask] = useState(true);

  useEffect(() => {
    setDecisionComment("");
    setAssignToTask(true);
  }, [decisionTarget?.request.id, decisionTarget?.action]);

  useEffect(() => {
    setDrawerDecisionComment("");
    setDrawerAssignToTask(true);
  }, [previewRequest?.id]);

  const invalidateRequests = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: adminRequestKeys.all() }),
      queryClient.invalidateQueries({ queryKey: adminDashboardKeys.all() }),
    ]);
  }, [queryClient]);

  const approveMutation = useMutation({
    mutationFn: approveAdminRequest,
    onSuccess: async (_, variables) => {
      const title = decisionTarget?.request.title;
      notifyDecisionSuccess("approve", t, title);
      setDecisionTarget(null);
      setPreviewRequest(null);
      await Promise.all([
        invalidateRequests(),
        variables.typeName === "organizationJoin" ||
        variables.typeName === "organizationLeave"
          ? queryClient.invalidateQueries({ queryKey: chatKeys.lists() })
          : Promise.resolve(),
      ]);
      notifyApprovalSideEffect(variables.typeName, t);
    },
    onError: async (error) => {
      notifyDecisionFailure("approval", error, t);
      await invalidateRequests();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectAdminRequest,
    onSuccess: async () => {
      const title = decisionTarget?.request.title;
      notifyDecisionSuccess("reject", t, title);
      setDecisionTarget(null);
      setPreviewRequest(null);
      await invalidateRequests();
    },
    onError: async (error) => {
      notifyDecisionFailure("rejection", error, t);
      await invalidateRequests();
    },
  });

  const isDecisionPending =
    approveMutation.isPending || rejectMutation.isPending;
  const activeDecisionMutation =
    decisionTarget?.action === "approve" ? approveMutation : rejectMutation;

  const openDecisionModal = (
    request: AdminRequestListItem,
    action: DecisionAction,
  ) => {
    approveMutation.reset();
    rejectMutation.reset();
    if (requiresPreviewDecision(request)) {
      setPreviewRequest(request);
      return;
    }

    setDecisionTarget({ request, action });
  };

  const closeDecisionModal = () => {
    if (isDecisionPending) {
      return;
    }

    setDecisionTarget(null);
    approveMutation.reset();
    rejectMutation.reset();
  };

  const submitDecisionPayload = (
    request: AdminRequestListItem,
    action: DecisionAction,
    comment: string,
    assign: boolean,
  ) => {
    const payload = {
      requestId: request.id,
      typeName: request.typeName,
      comment,
      assignToTask: assign,
    };

    if (action === "approve") {
      approveMutation.mutate(payload);
      return;
    }

    rejectMutation.mutate(payload);
  };

  const submitDecision = () => {
    if (!decisionTarget) {
      return;
    }

    submitDecisionPayload(
      decisionTarget.request,
      decisionTarget.action,
      decisionComment,
      assignToTask,
    );
  };

  const submitDrawerDecision = (action: DecisionAction) => {
    if (!previewRequest) {
      return;
    }

    submitDecisionPayload(
      previewRequest,
      action,
      drawerDecisionComment,
      drawerAssignToTask,
    );
  };

  const closePreviewDrawer = () => {
    if (!isDecisionPending) {
      setPreviewRequest(null);
    }
  };

  return {
    decision: {
      target: decisionTarget,
      comment: decisionComment,
      setComment: setDecisionComment,
      assignToTask,
      setAssignToTask,
      isPending: isDecisionPending,
      error: activeDecisionMutation.isError
        ? getErrorMessage(activeDecisionMutation.error, t)
        : null,
      openModal: openDecisionModal,
      closeModal: closeDecisionModal,
      submit: submitDecision,
    },
    drawer: {
      request: previewRequest,
      open: setPreviewRequest,
      close: closePreviewDrawer,
      decide: submitDrawerDecision,
      comment: drawerDecisionComment,
      setComment: setDrawerDecisionComment,
      assignToTask: drawerAssignToTask,
      setAssignToTask: setDrawerAssignToTask,
    },
  };
};
