import { SET_USER, CLEAR_USER, UPDATE_ERROR } from "../actions/user";

export function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.object);
    default:
      return state;
  }
}

export function clearUser(state = {}, action) {
  switch (action.type) {
    case CLEAR_USER:
      return {};
    default:
      return state;
  }
}

export function userUpdateError(state = null, action) {
  switch (action.type) {
    case UPDATE_ERROR:
      return action.text;
    default:
      return state;
  }
}
