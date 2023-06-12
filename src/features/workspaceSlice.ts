import { createSlice,CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
  defaultWsId: string;
  id: string;
  name: string;
  boards: any[];
}
const initialState = {
  defaultWsId: '',
  id: '',
  name: '',
boards: []
} as InitialState
const workspaceSlice = createSlice({
  name:  "workspace",
  initialState,
  reducers:{
    setDefaultWsID:(state,action:PayloadAction<string>)=>{
     state.defaultWsId = action.payload 
    },
    setID:(state,action:PayloadAction<string>)=>{
      state.id = action.payload
    },
    setName:(state,action:PayloadAction<string>)=>{
      state.name = action.payload
    },
    setBoards:(state,action:PayloadAction<any[]>)=>{
      state.boards = action.payload
    }
  }
})

export const {setDefaultWsID,setID,setName,setBoards} = workspaceSlice.actions
export default workspaceSlice
