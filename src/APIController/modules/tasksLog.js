import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/tasks_log";

//Получить весь лог выполнения всех задач за день
export function getTasksLogByDate(date, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.get(URL + "/date/" + date, headers).then(response => {
    let result = response.data;

    if (Array.isArray(result)) {
      callback(result);
    }
  });
}

//Добавить запись в лог выполнения задач
export function createTaskLog(taskLog, callback) {
  if (typeof taskLog !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.post(URL, taskLog, headers)
    .then(response => {
      if (typeof response.data.insertId === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}

//Обновить лог по ID
export function updateTaskLog(taskLog, callback) {
  if (typeof taskLog !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let id = taskLog.id;

  Axios.put(URL + "/" + id, taskLog, headers)
    .then(response => {
      if (typeof response.data.affectedRows === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}

//Удалить запись из лога выполнения задач
export function deleteTaskLog(ID, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.delete(URL + "/" + ID, headers)
    .then(response => {
      if (typeof response.data.affectedRows === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}
