import { configureStore } from "@reduxjs/toolkit";;
import setLocalStorage from "./local-storage";
import todoSlice from './slices/todo.slice'


const preLoadedState = JSON.parse(window.localStorage.getItem("state") || '{}');

const store = configureStore({
  reducer: {todos: todoSlice}, 
  preloadedState: preLoadedState,
  middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware(), setLocalStorage]
})

export default store;
