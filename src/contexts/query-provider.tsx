"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: 1, refetchOnWindowFocus: false },
      mutations: { retry: 0 },
    },
  });

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState<QueryClient>(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}