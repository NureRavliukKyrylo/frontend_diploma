import {
  reportCasesSearchDefaults,
  reportCasesSearchSchema,
  reportQuery,
} from "@entities/report";
import { ReportsPage } from "@pages/reports";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/reports/")({
  component: ReportsPage,
  validateSearch: reportCasesSearchSchema,
  search: { middlewares: [stripSearchParams(reportCasesSearchDefaults)] },
  loader: async ({ context: { queryClient }, location }) => {
    const search = reportCasesSearchSchema.parse(location.search);
    await queryClient.ensureQueryData(reportQuery.listParams(search));
    if (search.reportId) {
      await queryClient.ensureQueryData(reportQuery.id(search.reportId));
    }
  },
});
