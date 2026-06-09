export interface OfferBooking {
  id: string;
  offerId: string;
  worker: {
    id: string;
    firstName: string;
    lastName: string;
    userAvatar: string;
  };
  status: "Pending" | "Completed" | "Rejected" | "Cancelled" | "Disputed";
  comment: string;
  createdAt: string;
  canApprove: boolean;
  canReject: boolean;
  resolutionComment: string;
}
