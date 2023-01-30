import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoAdded: (state, action) => state = [action.payload,...state],
        todoUpdated: (state, action) => {
            // const todos = [...state]
            const todoIndex = state.findIndex( todo => todo._id == action.payload._id)
            state.splice(todoIndex,1,action.payload)
            // return [...todos.slice(0,todoIndex), action.payload, ...todos.slice(todoIndex)]
        },
        todoDeleted: (state, action) => state.filter( todo => todo._id != action.payload),
        todosFetched: (state, action) => state = action.payload,
    }
})

export default todoSlice.reducer
export const { todoAdded, todosFetched, todoUpdated, todoDeleted } = todoSlice.actions