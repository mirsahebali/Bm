import themeSlice from "@/features/themeSlice";
import workspaceSlice from "@/features/workspaceSlice";
import boardReducer from "@/features/boardSlice";
import { configureStore } from "@reduxjs/toolkit";
import type { ConfigureStoreOptions, Store } from "@reduxjs/toolkit";
const store: Store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    workspace: workspaceSlice.reducer,
    board: boardReducer,
  },
} satisfies ConfigureStoreOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
