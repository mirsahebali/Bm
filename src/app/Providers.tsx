"use client";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider } from "react-redux";
import { store } from "@/store/store"
export default function Providers({ children }: { children: React.ReactNode }) {
  return (

    <Provider store={store}>
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    </Provider>
  );
}
