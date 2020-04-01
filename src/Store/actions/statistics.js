//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
import { setNotifications } from "./notifications";
import { getFormatDate } from "../../Libs/TimeUtils";

export const SET_CATEGORIES_STATISTIC_BY_PERIOD =
  "SET_CATEGORIES_STATISTIC_BY_PERIOD";
export const CLEAR_CATEGORIES_STATISTIC_BY_PERIOD =
  "CLEAR_CATEGORIES_STATISTIC_BY_PERIOD";

export const SET_TASKS_STATISTIC_BY_PERIOD = "SET_TASKS_STATISTIC_BY_PERIOD";
export const CLEAR_TASKS_STATISTIC_BY_PERIOD =
  "CLEAR_TASKS_STATISTIC_BY_PERIOD";

export const SET_TOTAL_STATISTIC_BY_PERIOD = "SET_TOTAL_STATISTIC_BY_PERIOD";
export const SET_STATISTIC_BY_DAYS_FOR_PERIOD =
  "SET_STATISTIC_BY_DAYS_FOR_PERIOD";

export function setCategoriesStatisticByPeriod(object) {
  return { type: SET_CATEGORIES_STATISTIC_BY_PERIOD, object };
}

export function clearCategoriesStatisticByPeriod(object) {
  return { type: CLEAR_CATEGORIES_STATISTIC_BY_PERIOD, object };
}

export function setTasksStatisticByPeriod(object) {
  return { type: SET_TASKS_STATISTIC_BY_PERIOD, object };
}

export function clearTasksStatisticByPeriod(object) {
  return { type: CLEAR_TASKS_STATISTIC_BY_PERIOD, object };
}

export function setTotalStatisticByPeriod(number) {
  return { type: SET_TOTAL_STATISTIC_BY_PERIOD, number };
}

export function setStatisticByDaysForPeriod(array) {
  return { type: SET_STATISTIC_BY_DAYS_FOR_PERIOD, array };
}

//Получить статистику по категориям за определенный период
export function fetchCategoriesStatisticByPeriod(dateFrom, dateTo) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    let URL =
      APIURL +
      "/statistic/categories/period/" +
      getFormatDate(dateFrom) +
      "/" +
      getFormatDate(dateTo);

    Axios.get(URL, headers)
      .then(response => {
        dispatch(setCategoriesStatisticByPeriod(response.data));
      })
      .catch(error => {
        let message =
          "Не удалось получить статистику. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Получить статистику по задачам за определенный период
export function fetchTasksStatisticByPeriod(dateFrom, dateTo) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    let URL =
      APIURL +
      "/statistic/tasks/period/" +
      getFormatDate(dateFrom) +
      "/" +
      getFormatDate(dateTo);

    Axios.get(URL, headers)
      .then(response => {
        dispatch(setTasksStatisticByPeriod(response.data));
      })
      .catch(error => {
        let message =
          "Не удалось получить статистику. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Получить суммарную статистику за определенный период
export function fetchTotalStatisticByPeriod(dateFrom, dateTo) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    let URL =
      APIURL +
      "/statistic/total/period/" +
      getFormatDate(dateFrom) +
      "/" +
      getFormatDate(dateTo);

    Axios.get(URL, headers)
      .then(response => {
        dispatch(setTotalStatisticByPeriod(response.data.execution_time));
      })
      .catch(error => {
        let message =
          "Не удалось получить статистику. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Получить статистику по времени за дни определенного периода
export function fetchStatisticByDaysForPeriod(dateFrom, dateTo) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    let URL =
      APIURL +
      "/statistic/days/period/" +
      getFormatDate(dateFrom) +
      "/" +
      getFormatDate(dateTo);

    Axios.get(URL, headers)
      .then(response => {
        dispatch(setStatisticByDaysForPeriod(response.data));
      })
      .catch(error => {
        let message =
          "Не удалось получить статистику. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}
