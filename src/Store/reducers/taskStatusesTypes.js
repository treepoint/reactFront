import { SET_TASK_STATUSES_TYPES } from "../actions/taskStatusesTypes";

export function taskStatusesTypes(state = [], action) {
  switch (action.type) {
    case SET_TASK_STATUSES_TYPES:
      return action.array;
    default:
      return state;
  }
}
