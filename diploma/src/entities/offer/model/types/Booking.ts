export interface OfferBooking {
  id: string;
  offerId: string;
  worker: {
    id: string;
    firstName: string;
    lastName: string;
    userAvatar: string;
  };
  status:
    | "Pending"
    | "Completed"
    | "Rejected"
    | "Cancelled"
    | "Disputed"
    | "CompletionRequested";
  comment: string;
  createdAt: string;
  canApprove: boolean;
  canReject: boolean;
  canComplete: boolean;
  canCancel: boolean;
  canDispute: boolean;
  resolutionComment: string;
}
