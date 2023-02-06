import { configureStore } from "@reduxjs/toolkit";;
import setLocalStorage from "./middleware/local-storage"
import setServerStorage from './middleware/server-storage'
import todoSlice from './slices/todo.slice'
import appSlice from './slices/app.slice'

const preLoadedState = JSON.parse(window.localStorage.getItem("state") || '{}');

const store = configureStore({
  reducer: {
    todos: todoSlice,
    app: appSlice,
  }, 
  preloadedState: preLoadedState,
  middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware(), setLocalStorage, setServerStorage]
})

export default store;
