import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app', 
    initialState: {
        selectedTodo: null, 
        selectedFilter: null, 
    }, 
    reducers: {
        todoSelected: (state, action) => {state.selectedTodo = action.payload},
        filterSelected: (state, action) => {state.selectedFilter = action.payload},
    }
})

export default appSlice.reducer
export const {todoSelected, filterSelected} = appSlice.actions