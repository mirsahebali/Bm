import {createSlice} from "@reduxjs/toolkit";

interface InitialState{
  name: string;
  id: string;
}
const initialState:InitialState = {
  name: "",
  id: "",
}

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
})
export const {setName , setId} = listSlice.actions
export default listSlice.reducer
