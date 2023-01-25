import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoAdded: (state, action) => state = [...state, action.payload],
        todoUpdated: (state, action) => {
            const todos = [...state]
            const todoIndex = todos.findIndex( todo => todo._id == action.payload._id)
            return [...todos.slice(0,todoIndex), action.payload, ...todos.slice(todoIndex)]
        },
        todosFetched: (state, action) => state = action.payload,
    }
})

export default todoSlice.reducer
export const { todoAdded, todosFetched, todoUpdated } = todoSlice.actions