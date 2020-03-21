import {
  SET_CATEGORIES_STATISTIC_BY_PERIOD,
  CLEAR_CATEGORIES_STATISTIC_BY_PERIOD,
  SET_TASKS_STATISTIC_BY_PERIOD,
  CLEAR_TASKS_STATISTIC_BY_PERIOD
} from "../actions/statistics";

export function categoriesStatisticByPeriod(state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES_STATISTIC_BY_PERIOD:
      return Object.assign({}, state, action.object);
    case CLEAR_CATEGORIES_STATISTIC_BY_PERIOD:
      return {};
    default:
      return state;
  }
}

export function tasksStatisticByPeriod(state = {}, action) {
  switch (action.type) {
    case SET_TASKS_STATISTIC_BY_PERIOD:
      return Object.assign({}, state, action.object);
    case CLEAR_TASKS_STATISTIC_BY_PERIOD:
      return {};
    default:
      return state;
  }
}
