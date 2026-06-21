import type { Notification } from "@entities/notification";
import {
  AcceptInvitationButton,
  DeclineInvitationButton,
} from "@features/request";
import {
  ApproveOfferChangeButton,
  RejectOfferChangeButton,
} from "@features/time-bank";

interface GetNotificationActionsButtonParams {
  notification: Notification;
  onSuccess: () => void;
}

export const getNotificationActionsButton = ({
  notification,
  onSuccess,
}: GetNotificationActionsButtonParams) => {
  if (
    notification.type === "JoinRequestCreated" &&
    notification.metadata?.requestId
  ) {
    return (
      <>
        <AcceptInvitationButton
          requestId={notification.metadata.requestId}
          onSuccess={onSuccess}
        />
        <DeclineInvitationButton
          requestId={notification.metadata.requestId}
          onSuccess={onSuccess}
        />
      </>
    );
  }

  if (
    notification.type === "TimeSpendOfferUpdated" &&
    notification.metadata?.bookingId
  ) {
    return (
      <>
        <ApproveOfferChangeButton
          bookingId={notification.metadata.bookingId}
          onSuccess={onSuccess}
        />
        <RejectOfferChangeButton
          bookingId={notification.metadata.bookingId}
          onSuccess={onSuccess}
        />
      </>
    );
  }

  return null;
};
