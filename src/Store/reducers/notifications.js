import {
  SET_NOTIFICATIONS,
  REMOVE_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "../actions/notifications";

export function notifications(state = {}, action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return Object.assign({}, state, action.object);
    case REMOVE_NOTIFICATION:
      let object = { ...state };
      delete object[action.uuid];
      return object;
    case CLEAR_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
}
