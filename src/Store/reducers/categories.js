import {
  SET_CATEGORIES,
  IS_CATEGORIES_UPDATING,
  CLOSE_CATEGORY,
  CLEAR_CATEGORIES
} from "../actions/categories";

import { getCurrentDateWithTimeFormat } from "../../Libs/TimeUtils";

export function categories(state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return Object.assign({}, state, action.object);
    case CLOSE_CATEGORY:
      let object = { ...state };
      object[action.id].close_date = getCurrentDateWithTimeFormat();
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
