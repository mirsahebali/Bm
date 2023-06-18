import themeSlice from "@/features/themeSlice";
import workspaceSlice from "@/features/workspaceSlice";
import boardReducer from "@/features/boardSlice";
import listReducer from "@/features/listSlice"
import { configureStore } from "@reduxjs/toolkit";
const store= configureStore({
  reducer: {
    theme: themeSlice.reducer,
    workspace: workspaceSlice.reducer,
    board: boardReducer,
    list: listReducer
  },
} );
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;
