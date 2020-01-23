import {
  SET_USER,
  UPDATE_ERROR,
  CREATE_ERROR,
  SET_USER_IS_ADMIN
} from "../actions/user";

export function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.object);
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

export function userCreateError(state = null, action) {
  switch (action.type) {
    case CREATE_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function UserIsAdmin(state = false, action) {
  switch (action.type) {
    case SET_USER_IS_ADMIN:
      return action.boolean;
    default:
      return state;
  }
}
