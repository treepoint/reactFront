import {
  SET_MODAL_WINDOW_STATE,
  SET_MODAL_WINDOW_NAME
} from "../actions/globalModalWindow";

export function modalWindowState(state = false, action) {
  switch (action.type) {
    case SET_MODAL_WINDOW_STATE:
      return action.boolean;
    default:
      return state;
  }
}

export function modalWindowName(state = "", action) {
  switch (action.type) {
    case SET_MODAL_WINDOW_NAME:
      return action.text;
    default:
      return state;
  }
}
