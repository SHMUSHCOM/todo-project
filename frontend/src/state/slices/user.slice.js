import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users', 
    initialState: [],
    reducers: {
        usersFetched: (state, action) => state = action.payload,
    }
})

export default userSlice.reducer
export const {usersFetched} = userSlice.actions