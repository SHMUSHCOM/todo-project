import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: 'artists',
    initialState: [],
    reducers: {
        playlistChanged: (state, action) => state = action.payload 
    }
})

export default playlistSlice.reducer
export const { playlistChanged } = playlistSlice.actions