import {
  reportCasesSearchDefaults,
  reportCasesSearchSchema,
} from "@entities/report";
import { ReportsPage } from "@pages/reports";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/reports/")({
  component: ReportsPage,
  validateSearch: reportCasesSearchSchema,
  search: { middlewares: [stripSearchParams(reportCasesSearchDefaults)] },
});
