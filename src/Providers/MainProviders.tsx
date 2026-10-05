"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Provider } from "./Provider";
import SmoothScroll from "./SmoothScroll";

export function MainProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } } }));
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <SmoothScroll>{children}</SmoothScroll>
      </QueryClientProvider>
    </Provider>
  );
}
