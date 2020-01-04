import Axios from "axios";
import { APIURL } from "../Settings";
import { getFormatDate } from "../../Libs/TimeUtils";

const tokens = require("./tokens.js");

/*
 * Статистика по категориям
 */

//Получить время исполнения по всем категориям
export function getTimeExecutionForAllCategories(callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/time_execution/all";

  Axios.get(url, headers).then(response => {
    let result = response.data;

    if (Array.isArray(result)) {
      callback(result);
    }
  });
}

//Получить время исполнения по всем категориям за определенный день
export function getTimeExecutionForAllCategoriesByDate(date, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/time_execution/date/" + date;

  Axios.get(url, headers).then(response => {
    let result = response.data;

    if (Array.isArray(result)) {
      callback(result);
    }
  });
}

//Получить статистику по категориям за период
export function getCategoriesStatisticByPeriod(dateFrom, dateTo, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let url =
    APIURL +
    "/categories/statistic/period/" +
    getFormatDate(dateFrom) +
    "/" +
    getFormatDate(dateTo);

  Axios.get(url, headers).then(response => {
    let result = response.data;

    if (Array.isArray(result)) {
      callback(result);
    }
  });
}

/*
 * Статистика по задача
 */

//Получить статистику по задачам за период
export function getTaskStatisticByPeriod(dateFrom, dateTo, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let url =
    APIURL +
    "/tasks/statistic/period/" +
    getFormatDate(dateFrom) +
    "/" +
    getFormatDate(dateTo);

  Axios.get(url, headers).then(response => {
    let result = response.data;

    if (Array.isArray(result)) {
      callback(result);
    }
  });
}
