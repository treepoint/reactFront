import {
  SET_CATEGORIES,
  CLEAR_CATEGORIES,
  IS_CATEGORIES_UPDATING,
} from "../actions/categories";

export function categories(state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return Object.assign({}, state, action.object);
    case CLEAR_CATEGORIES:
      return {};
    default:
      return state;
  }
}

export function categoriesIsUpdating(state = false, action) {
  switch (action.type) {
    case IS_CATEGORIES_UPDATING:
      return action.boolean;
    default:
      return state;
  }
}
