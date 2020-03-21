import {
  SET_CATEGORIES,
  IS_CATEGORIES_UPDATING,
  REMOVE_CATEGORY,
  CLEAR_CATEGORIES
} from "../actions/categories";

export function categories(state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return Object.assign({}, state, action.object);
    case REMOVE_CATEGORY:
      let object = { ...state };
      delete object[action.id];
      return object;
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
