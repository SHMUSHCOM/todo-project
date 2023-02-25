import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoCreated: (state, action) => state = [action.payload,...state],
        todosFetched: (state, action) => state = action.payload,
    }
})

export default todoSlice.reducer
export const { todoCreated, todosFetched } = todoSlice.actions