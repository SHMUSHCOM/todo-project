import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoAdded: (state, action) => state = [...state, action.payload],
        todosFetched: (state, action) => state = action.payload,
    }
})

export default todoSlice.reducer
export const { todoAdded, todosFetched } = todoSlice.actions