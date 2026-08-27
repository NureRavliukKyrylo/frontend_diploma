import { useRequestDataQueries } from "./useRequestDataQueries";
import { useRequestDecisionFlow } from "./useRequestDecisionFlow";
import { useRequestSearchControls } from "./useRequestSearchControls";

export const useAdminRequestsPage = () => {
  const searchControls = useRequestSearchControls();
  const requestData = useRequestDataQueries(searchControls.search);
  const decisionFlow = useRequestDecisionFlow();

  return {
    ...searchControls,
    categoryMap: requestData.categoryMap,
    metrics: requestData.metrics,
    tabs: requestData.tabs,
    list: requestData.list,
    decision: decisionFlow.decision,
    drawer: decisionFlow.drawer,
  };
};
