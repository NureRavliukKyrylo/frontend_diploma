import type { OrganizationMembersPageModel } from "../../model/types";
import { MembersGrid } from "./MembersGrid";
import { RequestsContent } from "./RequestsContent";

interface MembersContentProps {
  model: OrganizationMembersPageModel;
}

export const MembersContent = ({ model }: MembersContentProps) => {
  const hasSearch = model.searchValue.trim().length > 0;

  if (model.activeTab === "members") {
    return <MembersGrid model={model} hasSearch={hasSearch} />;
  }

  return <RequestsContent model={model} hasSearch={hasSearch} />;
};
