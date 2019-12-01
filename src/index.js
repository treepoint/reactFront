import React from "react";
import ReactDOM from "react-dom";
//Подключаем Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import appReducer from "./Store/reducers";
//Импортируем само приложение
import App from "./Containers/App/App";
//Подключаем CSS
import "./index.css";

let store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
