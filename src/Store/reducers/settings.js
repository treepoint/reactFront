import { TASKS_BACKGROUND_IMAGE } from "../actions/settings";

export function tasksBackgroundImage(state = null, action) {
  switch (action.type) {
    case TASKS_BACKGROUND_IMAGE:
      return action.string;
    default:
      return state;
  }
}
