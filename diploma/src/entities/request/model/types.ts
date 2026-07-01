export type EntityRequestKind = "join" | "leave";

export interface PendingEntityRequest {
  id: string;
  userId: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  kind: EntityRequestKind;
}
