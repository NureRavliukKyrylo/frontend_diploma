import { useRequestDataQueries } from "./useRequestDataQueries";
import { useRequestDecisionFlow } from "./useRequestDecisionFlow";
import { useRequestSearchControls } from "./useRequestSearchControls";

export const useAdminRequestsPage = () => {
  const searchControls = useRequestSearchControls();
  const data = useRequestDataQueries(searchControls.search);
  const decisionFlow = useRequestDecisionFlow();

  return {
    ...searchControls,
    categoryMap: data.categoryMap,
    metrics: data.metrics,
    tabs: data.tabs,
    list: data.list,
    decision: decisionFlow.decision,
    drawer: decisionFlow.drawer,
  };
};
