import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app', 
    initialState: {
        selectedTodo: null, 
        statusFilter: null,
        searchFilter: null,
        sortColumn: 'createdAt',
        sortOrder: 1,
        accessToken: null,
    }, 
    reducers: {
        todoSelected: (state, action) => {state.selectedTodo = action.payload},
        statusFilterSelected: (state, action) => {state.statusFilter = action.payload},
        searchFilterUpdated: (state, action) => {state.searchFilter = action.payload},
        sortColumnUpdated: (state, action) => {state.sortColumn = action.payload},
        sortOrderUpdated: (state) => {state.sortOrder = -1 * state.sortOrder},
        accessTokenUpdated: (state, action) => {state.accessToken = action.payload}
    }
})

export default appSlice.reducer
export const {todoSelected, statusFilterSelected, searchFilterUpdated, sortColumnUpdated, sortOrderUpdated, accessTokenUpdated} = appSlice.actions