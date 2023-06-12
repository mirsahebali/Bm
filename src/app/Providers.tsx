"use client";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import store from "@/store/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient() 
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
        <ReactQueryDevtools/>
      </SessionProvider>
    </Provider>
    </QueryClientProvider>
  );
}
