import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import App from './App'
import SignUp from './login/sign-up';
import Page404 from "./pages/404-page";
import ListView from "./pages/list/todo-list";
import BoardView from "./pages/board";
import TimelineView from "./pages/timeline";

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
        <Route path='/auth' element={<SignUp/>}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
)
