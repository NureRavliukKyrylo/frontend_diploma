import { offerQuery, type TransactionsSearchParams } from "@entities/offer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useTransactionsTab = (search: TransactionsSearchParams) => {
  const navigate = useNavigate({ from: "/time-bank/" });

  const { data: transactions } = useQuery(offerQuery.listTransactions(search));

  const handlePageChange = (page: number) =>
    navigate({
      search: (prev) => ({ ...prev, Page: page }),
    });

  return {
    search,
    handlePageChange,
    transactions,
  };
};
