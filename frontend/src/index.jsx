import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from "react-redux";
import App from './App'

import store from "./state/store";
import GlobalStyles from './styles/global-styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalStyles/>
    <App/>
  </Provider>,
)
