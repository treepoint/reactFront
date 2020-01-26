import { SET_USER_ROLES, CLEAR_USER_ROLES } from "../actions/userRoles";

export function userRoles(state = {}, action) {
  switch (action.type) {
    case SET_USER_ROLES:
      return Object.assign({}, state, action.object);
    case CLEAR_USER_ROLES:
      return {};
    default:
      return state;
  }
}
