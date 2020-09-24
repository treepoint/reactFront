import {
  SET_PROJECTS,
  CLEAR_PROJECTS,
  IS_PROJECTS_UPDATING,
} from "../actions/projects";

export function projects(state = {}, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return Object.assign({}, state, action.object);
    case CLEAR_PROJECTS:
      return {};
    default:
      return state;
  }
}

export function projectsIsUpdating(state = false, action) {
  switch (action.type) {
    case IS_PROJECTS_UPDATING:
      return action.boolean;
    default:
      return state;
  }
}
