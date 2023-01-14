import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
    name: 'artists',
    initialState: [],
    reducers: {
        songsChanged: (state, action) => state = action.payload 
    }
})

export default songsSlice.reducer
export const { songsChanged } = songsSlice.actions