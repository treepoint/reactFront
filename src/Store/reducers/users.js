import {
  SET_USERS,
  REMOVE_USER,
  CLEAR_USERS,
  IS_USERS_UPDATING,
  USER_UPDATE_ERROR,
  USER_DELETE_ERROR
} from "../actions/users";

export function users(state = {}, action) {
  switch (action.type) {
    case SET_USERS:
      return Object.assign({}, state, action.object);
    case REMOVE_USER:
      let object = { ...state };
      delete object[action.id];
      return object;
    case CLEAR_USERS:
      return {};
    default:
      return state;
  }
}

export function usersIsUpdating(state = false, action) {
  switch (action.type) {
    case IS_USERS_UPDATING:
      return action.boolean;
    default:
      return state;
  }
}

export function userUpdateError(state = null, action) {
  switch (action.type) {
    case USER_UPDATE_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function userDeleteError(state = null, action) {
  switch (action.type) {
    case USER_DELETE_ERROR:
      return action.text;
    default:
      return state;
  }
}
