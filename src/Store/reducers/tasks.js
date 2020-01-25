import {
  SET_TASKS,
  IS_TASKS_UPDATING,
  REMOVE_TASK,
  CLEAR_TASKS,
  TASK_CREATE_ERROR,
  TASK_UPDATE_ERROR,
  TASK_DELETE_ERROR
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

export function tasksIsUpdating(state = false, action) {
  switch (action.type) {
    case IS_TASKS_UPDATING:
      return action.boolean;
    default:
      return state;
  }
}

export function taskCreateError(state = null, action) {
  switch (action.type) {
    case TASK_CREATE_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function taskUpdateError(state = null, action) {
  switch (action.type) {
    case TASK_UPDATE_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function taskDeleteError(state = null, action) {
  switch (action.type) {
    case TASK_DELETE_ERROR:
      return action.text;
    default:
      return state;
  }
}
