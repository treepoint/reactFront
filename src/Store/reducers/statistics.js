import {
  SET_CATEGORIES_STATISTIC_BY_PERIOD,
  CLEAR_CATEGORIES_STATISTIC_BY_PERIOD,
  SET_TASKS_STATISTIC_BY_PERIOD,
  CLEAR_TASKS_STATISTIC_BY_PERIOD,
  SET_TOTAL_STATISTIC_BY_PERIOD,
  SET_STATISTIC_BY_DAYS_FOR_PERIOD
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

export function totalStatisticByPeriod(state = {}, action) {
  switch (action.type) {
    case SET_TOTAL_STATISTIC_BY_PERIOD:
      return action.number;
    default:
      return state;
  }
}

export function statisticByDaysForPeriod(state = [], action) {
  switch (action.type) {
    case SET_STATISTIC_BY_DAYS_FOR_PERIOD:
      return action.array;
    default:
      return state;
  }
}
