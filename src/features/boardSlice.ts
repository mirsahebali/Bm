import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, CreateSliceOptions } from "@reduxjs/toolkit";

interface InitialState {
  name: string;
  id: string;
  array: any[];
  obj: {
    name: string;
    id: string;
    array: any[];
  }
}
const initialState: InitialState = {
  name: "",
  id: "",
  array: [],
  obj: {
    name: "",
    id: "",
    array: [],
  }
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setArray: (state, action: PayloadAction<any[]>) => {
      state.array = action.payload;
    },
    setObj: (state, action: PayloadAction<any>) => {
      state.obj = action.payload;
    }
  },
} as CreateSliceOptions<InitialState>);

export const { setName, setId, setArray, setObj } = boardSlice.actions;

export default boardSlice.reducer;
