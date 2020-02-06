import React from "react";
import ReactDOM from "react-dom";
//Подключаем роутер
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
//Подключаем Redux
import { Provider } from "react-redux";
import configureStore, { history } from "./Store/configureStore";
//Импортируем само приложение
import App from "./Containers/App/App";
//Подключаем CSS
import "./index.css";

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
