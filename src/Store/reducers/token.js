import { SET_TOKEN, CLEAR_TOKEN, SET_AUTH_ERROR } from "../actions/token";

export function token(state = null, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.text;
    case CLEAR_TOKEN:
      return null;
    default:
      return state;
  }
}

export function authError(state = null, action) {
  switch (action.type) {
    case SET_AUTH_ERROR:
      return action.text;
    default:
      return state;
  }
}
