import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ReduxApp from "./Containers/App/ReduxApp";
import { createStore } from "redux";
import { Provider } from "react-redux";
import appReducer from "./Store/reducers";

let store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <ReduxApp />
  </Provider>,
  document.getElementById("root")
);
