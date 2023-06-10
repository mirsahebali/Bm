import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit";
 const themeSlice = createSlice({
  name: "theme",
  initialState: "dark",
  reducers: {
    toggleTheme: (state, action: PayloadAction<"light" | "dark">) => {
state = action.payload
    },
  },
})
export const {toggleTheme} = themeSlice.actions
export default themeSlice
