import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_IS_ADMIN,
  REGISTRATION_ERROR,
  UPDATE_PROFILE_ERROR
} from "../actions/currentUser";

export function currentUser(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, action.object);
    default:
      return state;
  }
}

export function updateProfileError(state = null, action) {
  switch (action.type) {
    case UPDATE_PROFILE_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function registrationError(state = null, action) {
  switch (action.type) {
    case REGISTRATION_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function currentUserIsAdmin(state = false, action) {
  switch (action.type) {
    case SET_CURRENT_USER_IS_ADMIN:
      return action.boolean;
    default:
      return state;
  }
}
