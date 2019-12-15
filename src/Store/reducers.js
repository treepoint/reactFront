import {
  SET_TOKEN,
  SET_USER,
  SET_MODAL_WINDOW_STATE,
  SET_MODAL_WINDOW_NAME,
  LOADING
} from "./actions";

import { combineReducers } from "redux";

function token(state = null, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.text;
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

function loading(state = true, action) {
  switch (action.type) {
    case LOADING:
      return action.boolean;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  token,
  user,
  modalWindowState,
  modalWindowName,
  loading
});

export default appReducer;
