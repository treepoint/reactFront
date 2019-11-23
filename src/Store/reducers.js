import {
  SET_USER_EMAIL,
  SET_USER_PASSWORD,
  SET_REGISTRATION_WINDOW_STATE,
  SET_LOGIN_WINDOW_STATE
} from "./actions";

import { combineReducers } from "redux";

function userEmail(state = "", action) {
  switch (action.type) {
    case SET_USER_EMAIL:
      return action.text;
    default:
      return state;
  }
}

function userPassword(state = "", action) {
  switch (action.type) {
    case SET_USER_PASSWORD:
      return action.text;
    default:
      return state;
  }
}

function registrationWindowState(state = false, action) {
  switch (action.type) {
    case SET_REGISTRATION_WINDOW_STATE:
      return action.boolean;
    default:
      return state;
  }
}

function loginWindowState(state = false, action) {
  switch (action.type) {
    case SET_LOGIN_WINDOW_STATE:
      return action.boolean;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  //Управление пользовательскими данными
  userEmail,
  userPassword,
  //Управление состояниями модалок
  registrationWindowState,
  loginWindowState
});

export default appReducer;
