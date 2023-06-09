import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
} as ConfigureStoreOptions)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
