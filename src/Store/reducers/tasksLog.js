import {
  SET_TASKS_LOG,
  IS_TASKS_LOG_UPDATING,
  REMOVE_TASK_LOG,
  CLEAR_TASKS_LOG,
  TASK_LOG_CREATE_ERROR,
  TASK_LOG_UPDATE_ERROR,
  TASK_LOG_DELETE_ERROR
} from "../actions/tasksLog";

export function tasksLog(state = {}, action) {
  switch (action.type) {
    case SET_TASKS_LOG:
      return Object.assign({}, state, action.object);
    case REMOVE_TASK_LOG:
      let object = { ...state };
      delete object[action.id];
      return object;
    case CLEAR_TASKS_LOG:
      return {};
    default:
      return state;
  }
}

export function tasksLogIsUpdating(state = false, action) {
  switch (action.type) {
    case IS_TASKS_LOG_UPDATING:
      return action.boolean;
    default:
      return state;
  }
}

export function taskLogCreateError(state = null, action) {
  switch (action.type) {
    case TASK_LOG_CREATE_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function taskLogUpdateError(state = null, action) {
  switch (action.type) {
    case TASK_LOG_UPDATE_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function taskLogDeleteError(state = null, action) {
  switch (action.type) {
    case TASK_LOG_DELETE_ERROR:
      return action.text;
    default:
      return state;
  }
}
