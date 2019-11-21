import {
  SET_USER_NAME,
  SET_USER_SECOND_NAME,
  SET_USER_THIRD_NAME,
  SET_REGISTRATION_WINDOW_STATE
} from "./actions";

import { combineReducers } from "redux";

function userName(state = "", action) {
  switch (action.type) {
    case SET_USER_NAME:
      return action.text;
    default:
      return state;
  }
}

function userSecondName(state = "", action) {
  switch (action.type) {
    case SET_USER_SECOND_NAME:
      return action.text;
    default:
      return state;
  }
}

function userThirdName(state = "", action) {
  switch (action.type) {
    case SET_USER_THIRD_NAME:
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

const appReducer = combineReducers({
  //Управление пользовательскими данными
  userName,
  userSecondName,
  userThirdName,
  //Управление состояниями модалок
  registrationWindowState
});

export default appReducer;
