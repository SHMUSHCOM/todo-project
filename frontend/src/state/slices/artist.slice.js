import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
    name: 'artists',
    initialState: [],
    reducers: {
        artistsChanged: (state, action) => state = action.payload 
    }
})

export default artistSlice.reducer
export const { artistsChanged } = artistSlice.actions