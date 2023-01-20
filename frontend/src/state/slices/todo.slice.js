import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoAdded: (state, action) => state = [...state, action.payload]
    }
})

export default todoSlice.reducer
export const { todoAdded } = todoSlice.actions