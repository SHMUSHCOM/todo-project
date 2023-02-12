import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import App from './App'
import Register from './components/auth/register';
import Login from './components/auth/login'
import Page404 from "./components/pages/404-page";
import ListView from "./components/pages/list/todo-list";
import BoardView from "./components/pages/board";
import TimelineView from "./components/pages/timeline";

import store from "./state/store";
import GlobalStyles from './styles/global-styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles/>
      <Routes>
        <Route path='/' element={<App/>}>
            <Route path="/" element={<ListView />}></Route>
            <Route path="list" element={<ListView />}></Route>
            <Route path="board" element={<BoardView />}></Route>
            <Route path="timeline" element={<TimelineView />}></Route>
        </Route>
        <Route path='/auth/register' element={<Register/>}></Route>
        <Route path='/auth/login' element={<Login/>}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
)
