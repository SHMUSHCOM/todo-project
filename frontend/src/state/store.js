import { configureStore } from "@reduxjs/toolkit";;
import setLocalStorage from "./middleware/local-storage"
import setServerStorage from './middleware/server-storage'
import todoSlice from './slices/todo.slice'
import appSlice from './slices/app.slice'
import userSlice from "./slices/user.slice";
import { combineReducers } from "@reduxjs/toolkit";

const preLoadedState = JSON.parse(window.localStorage.getItem("state") || '{}');

const combinedReducers = combineReducers({
  todos: todoSlice,
  app: appSlice,
  users: userSlice,
})

// RESET THE STATE ON LOGOUT
const reducer = (state, action) => {
  if (action.type == 'app/logout') return combinedReducers(undefined, action)
  return combinedReducers(state, action) // 
}

const store = configureStore({
  reducer, 
  preloadedState: preLoadedState,
  // middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware(), setLocalStorage, setServerStorage]
  middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware(), setLocalStorage]
})

export default store;
