import React from "react";
import ReactDOM from "react-dom";
//Подключаем роутер
import { BrowserRouter } from "react-router-dom";
//Подключаем Redux
import { Provider } from "react-redux";
import configureStore from "./Store/configureStore";

//Импортируем само приложение
import App from "./Containers/App/App";
//Подключаем CSS
import "./index.css";

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
