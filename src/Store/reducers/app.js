import {
  SET_USER_AUTH_STATE,
  SET_AUTH_ERROR,
  SET_SHOW_BROADCAST_MESSAGE,
  SET_SHOW_HEADER_WARNING,
  SET_WINDOW_HEIGHT,
  SET_WINDOW_WIDTH
} from "../actions/app";

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

export function showBroadcastMessage(state = true, action) {
  switch (action.type) {
    case SET_SHOW_BROADCAST_MESSAGE:
      return action.boolean;
    default:
      return state;
  }
}

export function showHeaderWarning(state = false, action) {
  switch (action.type) {
    case SET_SHOW_HEADER_WARNING:
      return action.boolean;
    default:
      return state;
  }
}

export function windowHeight(state = 0, action) {
  switch (action.type) {
    case SET_WINDOW_HEIGHT:
      return action.number;
    default:
      return state;
  }
}

export function windowWidth(state = 0, action) {
  switch (action.type) {
    case SET_WINDOW_WIDTH:
      return action.number;
    default:
      return state;
  }
}
