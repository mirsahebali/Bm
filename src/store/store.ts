import themeSlice from "@/features/themeSlice";
import workspaceSlice from "@/features/workspaceSlice";
import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    theme:  themeSlice.reducer,
    workspace: workspaceSlice.reducer
  },
} as ConfigureStoreOptions);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
