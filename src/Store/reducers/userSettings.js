import {
  SET_USER_SETTINGS,
  CLEAR_USER_SETTINGS,
  IS_USER_SETTINGS_UPDATING,
  USER_SETTINGS_UPDATE_ERROR
} from "../actions/userSettings";

export function userSettings(state = {}, action) {
  switch (action.type) {
    case SET_USER_SETTINGS:
      return Object.assign({}, state, action.object);
    case CLEAR_USER_SETTINGS:
      return {};
    default:
      return state;
  }
}

export function userSettingsIsUpdating(state = false, action) {
  switch (action.type) {
    case IS_USER_SETTINGS_UPDATING:
      return action.boolean;
    default:
      return state;
  }
}

export function userSettingsUpdateError(state = null, action) {
  switch (action.type) {
    case USER_SETTINGS_UPDATE_ERROR:
      return action.text;
    default:
      return state;
  }
}
