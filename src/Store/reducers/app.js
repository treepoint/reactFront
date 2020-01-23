import { SET_USER_AUTH_STATE, SET_AUTH_ERROR } from "../actions/app";

export function userAuthState(state = false, action) {
  switch (action.type) {
    case SET_USER_AUTH_STATE:
      return action.boolean;
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
