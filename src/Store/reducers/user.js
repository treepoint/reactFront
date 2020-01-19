import { SET_USER } from "../actions/user";

export function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.object);
    default:
      return state;
  }
}
