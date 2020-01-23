import { SET_TOKEN, CLEAR_TOKEN } from "../actions/token";

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
