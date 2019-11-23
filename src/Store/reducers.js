import {
  SET_USER_LOGIN_STATE,
  SET_USER,
  SET_MODAL_WINDOW_STATE,
  SET_MODAL_WINDOW_NAME
} from "./actions";

import { combineReducers } from "redux";

function isUserLogin(state = false, action) {
  switch (action.type) {
    case SET_USER_LOGIN_STATE:
      return action.boolean;
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.object);
    default:
      return state;
  }
}

function modalWindowState(state = false, action) {
  switch (action.type) {
    case SET_MODAL_WINDOW_STATE:
      return action.boolean;
    default:
      return state;
  }
}

function modalWindowName(state = "", action) {
  switch (action.type) {
    case SET_MODAL_WINDOW_NAME:
      return action.text;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  //Управление состоянием приложения
  isUserLogin,
  //Управление пользовательскими данными
  user,
  //Управление модалкой
  modalWindowState,
  modalWindowName
});

export default appReducer;
