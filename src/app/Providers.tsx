"use client";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import store from "@/store/store";
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient() 
  return (
    <Provider store={store}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
}
