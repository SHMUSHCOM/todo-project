import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoCreated: (state, action) => state = [action.payload,...state],
        todoUpdated: (state, action) => {
            const todoIndex = state.findIndex( todo => todo?._id == action.payload?._id)
            state.splice(todoIndex,1,action.payload)
        },
        todoDeleted: (state, action) => state.filter( todo => todo?._id != action.payload),
        todosFetched: (state, action) => state = action.payload,
    }
})

export default todoSlice.reducer
export const { todoCreated, todosFetched, todoUpdated, todoDeleted } = todoSlice.actions