import {
  SET_TASK_STATUSES,
  IS_TASK_STATUSES_UPDATING,
  REMOVE_TASK_STATUS,
  CLEAR_TASK_STATUSES,
  TASK_STATUS_UPDATE_ERROR,
  TASK_STATUS_CREATE_ERROR
} from "../actions/taskStatuses";

export function taskStatuses(state = {}, action) {
  switch (action.type) {
    case SET_TASK_STATUSES:
      return Object.assign({}, state, action.object);
    case REMOVE_TASK_STATUS:
      let object = { ...state };
      delete object[action.id];
      return object;
    case CLEAR_TASK_STATUSES:
      return {};
    default:
      return state;
  }
}

export function taskStatusIsUpdating(state = false, action) {
  switch (action.type) {
    case IS_TASK_STATUSES_UPDATING:
      return action.boolean;
    default:
      return state;
  }
}

export function taskStatusUpdateError(state = null, action) {
  switch (action.type) {
    case TASK_STATUS_UPDATE_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function taskStatusCreateError(state = null, action) {
  switch (action.type) {
    case TASK_STATUS_CREATE_ERROR:
      return action.text;
    default:
      return state;
  }
}
