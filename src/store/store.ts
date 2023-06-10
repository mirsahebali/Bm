import themeSlice from "@/features/themeSlice";
import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    theme:  themeSlice.reducer
  },
} as ConfigureStoreOptions);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
