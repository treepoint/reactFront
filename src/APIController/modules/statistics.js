import Axios from "axios";
import { APIURL } from "../Settings";
import { getFormatDate } from "../../Libs/TimeUtils";

const tokens = require("./tokens.js");

/*
 * Статистика по категория
 */

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
 * Статистика по задачам
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
