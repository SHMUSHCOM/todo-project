import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app', 
    initialState: {
        selectedTodo: null, 
        statusFilter: null,
        searchFilter: null,
    }, 
    reducers: {
        todoSelected: (state, action) => {state.selectedTodo = action.payload},
        statusFilterSelected: (state, action) => {state.statusFilter = action.payload},
        searchFilterUpdated: (state, action) => {state.searchFilter = action.payload}
    }
})

export default appSlice.reducer
export const {todoSelected, statusFilterSelected, searchFilterUpdated} = appSlice.actions