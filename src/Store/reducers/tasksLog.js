import {
  SET_TASKS_LOG,
  IS_TASKS_LOG_UPDATING,
  REMOVE_TASK_LOG,
  CLEAR_TASKS_LOG
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
