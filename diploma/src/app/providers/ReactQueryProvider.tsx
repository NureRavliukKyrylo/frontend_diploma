import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/libs";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
