import Axios from "axios";
import { APIURL } from "../Settings";
import { getFormatDate } from "../../Libs/TimeUtils";

const tokens = require("./tokens.js");

/*
 * Статистика по категориям
 */

//Получить время исполнения по всем категориям
export function getTimeExecutionForAllCategories() {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/time_execution/all";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

//Получить время исполнения по всем категориям за определенный день
export function getTimeExecutionForAllCategoriesByDate(date) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/time_execution/date/" + date;

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

/*
 * Статистика по задача
 */

//Получить статистику по задачам за период
export function getTaskStatisticByPeriod(from, to) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let url =
    APIURL +
    "/tasks/statistic/period/" +
    getFormatDate(from) +
    "/" +
    getFormatDate(to);

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}
