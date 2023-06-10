import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
  theme: "dark" | "light";
}
const initialState = {
  theme: "dark",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
} satisfies CreateSliceOptions);
export const { toggleTheme } = themeSlice.actions;

export default themeSlice;
