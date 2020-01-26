import {
  SET_TASK_STATUSES_TYPES,
  CLEAR_TASK_STATUSES_TYPES
} from "../actions/taskStatusesTypes";

export function taskStatusesTypes(state = {}, action) {
  switch (action.type) {
    case SET_TASK_STATUSES_TYPES:
      return Object.assign({}, state, action.object);
    case CLEAR_TASK_STATUSES_TYPES:
      return {};
    default:
      return state;
  }
}
