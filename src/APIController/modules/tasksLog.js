import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/tasks_log";

//Получить весь лог выполнения всех задач за день
export function getTasksLogByDate(date) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL + "/date/" + date, headers).then(response => {
    return response.data;
  });
}

//Обновить лог по ID
export function updateTaskLog(ID, taskLog) {
  if (typeof taskLog !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.put(URL + "/" + ID, taskLog, headers).then(response => {
    return response.data;
  });
}

//Добавить запись в лог выполнения задач
export function createTaskLog(taskLog) {
  if (typeof taskLog !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.post(URL, taskLog, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Удалить запись из лога выполнения задач
export function deleteTaskLog(ID) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.delete(URL + "/" + ID, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}
