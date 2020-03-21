import {
  SET_TASKS,
  IS_TASKS_UPDATING,
  IS_TASKS_FETCHING,
  REMOVE_TASK,
  CLEAR_TASKS
} from "../actions/tasks";

export function tasks(state = {}, action) {
  switch (action.type) {
    case SET_TASKS:
      return Object.assign({}, state, action.object);
    case REMOVE_TASK:
      let object = { ...state };
      delete object[action.id];
      return object;
    case CLEAR_TASKS:
      return {};
    default:
      return state;
  }
}

export function tasksIsFetching(state = true, action) {
  switch (action.type) {
    case IS_TASKS_FETCHING:
      return action.boolean;
    default:
      return state;
  }
}

export function tasksIsUpdating(state = false, action) {
  switch (action.type) {
    case IS_TASKS_UPDATING:
      return action.boolean;
    default:
      return state;
  }
}
