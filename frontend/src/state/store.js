import { configureStore } from "@reduxjs/toolkit";;
import setLocalStorage from "./local-storage";
import artistSlice from "./slices/artist.slice";
import songsSlice from "./slices/song.slice";
import playlistSlice from "./slices/playlist.slice";

const preLoadedState = JSON.parse(window.localStorage.getItem("state") || '{}');

const store = configureStore({
  reducer: {
    songs: songsSlice,
    artists: artistSlice,
    playlists: playlistSlice,
  }, 
  preloadedState: preLoadedState,
  middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware(), setLocalStorage]
})

export default store;
